using System;
using MongoDB.Driver;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using CoreWebApi.Data.DTOs;
using CoreWebApi.Data.models;
using CoreWebApi.Data.Repository.contracts;
using CoreWebApi.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson;


namespace CoreWebApi.Data.Repository
{
    public class UserRepository : IUserRepository
    {
        private IMongoCollection<User> Users { get; }
        
        private readonly AppSettings _appSettings;

        public UserRepository(MongoContext context, IOptions<AppSettings> appSettings)
        {
            Users = context.Database.GetCollection<User>("Users");
            _appSettings = appSettings.Value;
        }

        public async Task<User> FindUserByIdAsync(string id)
        {
            return await Users.Find(x => x.Id == ObjectId.Parse(id)).SingleAsync();
        }
        
        public User FindUserById(string id)
        {
            return Users.Find(x => x.Id == ObjectId.Parse(id)).Single();
        }

        public async Task<ObjectId> InsertUser(UserDto userDto)
        {
            var user = new User
            {
                Id = ObjectId.GenerateNewId(),
                Name = userDto.Name,
                Email = userDto.Email,
                Password = userDto.Password,
                Graphs = Array.Empty<Graph>()
            };
            Console.WriteLine("ID " + user.Id);
            await Users.InsertOneAsync(user);
            return user.Id;
        }

        public string Authenticate(LoginDto loginDto)
        {
            var user = Users.Find(x => x.Email == loginDto.Email && x.Password == loginDto.Password).FirstOrDefault();
            if (user == null)
            {
                return null;
            }

            return GenerateJwtToken(user);
        }
        
        // helper methods

        private string GenerateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        
    }
    
}

