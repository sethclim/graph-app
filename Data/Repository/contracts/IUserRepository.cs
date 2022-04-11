
using System.Threading.Tasks;

namespace CoreWebApi.Data.Repository.contracts
{
    public interface IUserRepository
    {
        Task<User> FindUserById(string id);
        void InsertUser(User user);
    }
}
