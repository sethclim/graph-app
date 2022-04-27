
using System.Threading.Tasks;
using CoreWebApi.Data.DTOs;
using CoreWebApi.Data.models;
using MongoDB.Bson;

namespace CoreWebApi.Data.Repository.contracts
{
    public interface IUserRepository
    {
        Task<User> FindUserById(string id);
        Task<ObjectId> InsertUser(InsertUserDTO userDto);
    }
}
