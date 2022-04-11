using System;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
using CoreWebApi.Data.Repository.contracts;
using MongoDB.Bson;

namespace CoreWebApi.Data.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly MongoContext _context;
        private IMongoCollection<User> Users { get; }

        public UserRepository(MongoContext context)
        {
            _context = context;
            Users = _context.Database.GetCollection<User>("Users");
        }

        public async Task<User> FindUserById(string id)
        {
            return await Users.Find(x => x.Id == id).SingleAsync();
        }

        public void InsertUser(User user)
        {
            Users.InsertOne(user);
        }
        
    }

}

