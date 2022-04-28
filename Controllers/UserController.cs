using System;
using System.Threading.Tasks;
using CoreWebApi.Data.DTOs;
using CoreWebApi.Data.models;
using CoreWebApi.Data.Repository.contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
        
        [Authorize]
        [HttpGet]
        public  ActionResult<User> GetUser()
        {
            var user = (User)HttpContext.Items["User"];
            Console.WriteLine("User ID " +  user);

            if (user != null)
                return user!;

            return BadRequest();
        }
        
        [AllowAnonymous]
        [HttpPost]
        public async Task<OkObjectResult> InsertUser([FromBody] UserDto userDto)
        {
            var id = await _userRepository.InsertUser(userDto);
            return Ok(id);
        }
        
        [AllowAnonymous]
        [Route("authenticate")]
        [HttpPost]
        public ActionResult Login([FromBody] LoginDto loginDto)
        {
            var token = _userRepository.Authenticate(loginDto);

            if (token == null)
                return Unauthorized();

            return Ok(new {token});
        }
    }
}