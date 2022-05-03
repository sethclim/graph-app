
using System.Threading.Tasks;
using CoreWebApi.Data.DTOs;
using CoreWebApi.Data.models;
using MongoDB.Bson;

namespace CoreWebApi.Data.Repository.contracts
{
    public interface IUserRepository
    {
        Task<User> FindUserByIdAsync(string id);
        User FindUserById(string id);
        Task<string> InsertUser(UserDto userDto);
        public string Authenticate(LoginDto loginDto);
    }
}
