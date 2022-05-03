using System.Threading.Tasks;
using CoreWebApi.Data.DTOs;
using CoreWebApi.Data.models;
using CoreWebApi.Data.Repository.contracts;
using MongoDB.Driver;
using MongoDB.Bson;

namespace CoreWebApi.Data.Repository
{
    public class GraphRepository : IGraphRepository
    {
        private readonly IMongoCollection<User> _users;
        public GraphRepository(MongoContext context)
        {
            _users = context.Database.GetCollection<User>("Users");
        }
        public async Task<UpdateResult> InsertGraph(GraphDto graphDto)
        {
            var user = Builders<User>.Filter.Where( u => u.Id == graphDto.UserId);

            var graph = new Graph
            {
                Id = ObjectId.GenerateNewId().ToString(),
                Line = graphDto.Line,
                Dots = graphDto.Dots,
                Points = graphDto.Points,
                XMin = graphDto.XMin,
                XMax = graphDto.XMax,
                XStep = graphDto.XStep,
                YMin = graphDto.YMin,
                YMax = graphDto.YMax,
                YStep = graphDto.YStep
            };

            // create the update definition
            var pushGraphDefinition = Builders<User>
                .Update.Push(u => u.Graphs, graph);

            return await _users.UpdateOneAsync(user, pushGraphDefinition);
        }
        
        
    }
}