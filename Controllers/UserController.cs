using System;
using System.Threading.Tasks;
using CoreWebApi.Data.DTOs;
using CoreWebApi.Data.models;
using CoreWebApi.Data.Repository.contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CoreWebApi.Controllers
{
    [ApiController]
    [Route("/user")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUserRepository _userRepository;

        public UserController(ILogger<UserController> logger, IUserRepository repo)
        {
            _logger = logger;
            _userRepository = repo;
        }

        [HttpGet]
        public async Task<User> GetUser()
        {
            return await _userRepository.FindUserById("62696d965901422ab6f3e23b");
        }
        
        [HttpPost]
        public async Task<OkObjectResult> InsertUser([FromBody] InsertUserDTO userDto)
        {
            var id = await _userRepository.InsertUser(userDto);
            Console.WriteLine("UC ID " + id);
            return Ok(id);
        }
    }
}