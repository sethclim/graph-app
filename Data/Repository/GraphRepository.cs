using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreWebApi.Data.DTOs;
using CoreWebApi.Data.models;
using CoreWebApi.Data.Repository.contracts;
using MongoDB.Driver;

namespace CoreWebApi.Data.Repository
{
    public class GraphRepository : IGraphRepository
    {
        private readonly IMongoCollection<User> _users;

        public GraphRepository(MongoContext context)
        {
            _users = context.Database.GetCollection<User>("Users");
        }

        public async Task<UpdateResult> InsertGraph(InsertGraphDTO graphDto)
        {
            var user =  Builders<User>.Filter.Eq("Id", graphDto.UserId);

            var graph = new Graph
            {
                Id = "00000000000000000000000",
                Data = graphDto.Graph,
            };

            // create the update definition
            var pushGraphDefinition = Builders<User>
                .Update.Push(u => u.Graphs, graph);
    
            return await _users.UpdateOneAsync(user, pushGraphDefinition);
        }
    }
}