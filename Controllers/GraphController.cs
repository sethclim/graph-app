using System;
using System.Threading.Tasks;
using CoreWebApi.Data.DTOs;
using CoreWebApi.Data.Repository.contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;

namespace CoreWebApi.Controllers
{
    [ApiController]
    [Route("/graph")]
    public class GraphController : ControllerBase
    {
        private readonly ILogger<GraphController> _logger;
        private readonly IGraphRepository _graphRepository;

        public GraphController(ILogger<GraphController> logger, IGraphRepository graphRepository)
        {
            _logger = logger;
            _graphRepository = graphRepository;
        }
        
        [HttpPost]
        public async Task<UpdateResult> InsertGraph([FromBody] GraphDto graphDto)
        {
            Console.WriteLine("Endpoint Insert");
            return await _graphRepository.InsertGraph(graphDto);
        }
        
    }
}