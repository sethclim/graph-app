using System;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
using CoreWebApi.Data.DTOs;
using CoreWebApi.Data.models;
using CoreWebApi.Data.Repository.contracts;
using MongoDB.Bson;
using MongoDB.Driver.Core.Operations;

namespace CoreWebApi.Data.Repository
{
    public class UserRepository : IUserRepository
    {
        private IMongoCollection<User> Users { get; }

        public UserRepository(MongoContext context)
        {
            Users = context.Database.GetCollection<User>("Users");
        }

        public async Task<User> FindUserById(string id)
        {
            return await Users.Find(x => x.Id == ObjectId.Parse(id)).SingleAsync();
        }

        public async Task<ObjectId> InsertUser(UserDto userDto)
        {
            var user = new User
            {
                Id = ObjectId.GenerateNewId(),
                Name = userDto.Name,
                Graphs = Array.Empty<Graph>()
            };
            Console.WriteLine("ID " + user.Id);
            await Users.InsertOneAsync(user);
            return user.Id;
        }
        
    }

}

