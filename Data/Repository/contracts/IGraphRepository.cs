using System.Threading.Tasks;
using CoreWebApi.Data.DTOs;
using CoreWebApi.Data.models;
using MongoDB.Driver;

namespace CoreWebApi.Data.Repository.contracts
{
    public interface IGraphRepository
    { 
        Task<UpdateResult> InsertGraph(InsertGraphDTO graphDto);

    }
}