using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreWebApi.Data.Repository.contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CoreWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
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
        public async Task<User> Get()
        {
            return await _userRepository.FindUserById("000000000000000000000000");
        }
    }
}
