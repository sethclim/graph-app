using MongoDB.Driver;
using System;
using System.Collections.Generic;


using Microsoft.Extensions.Options;

namespace CoreWebApi.Data
{
    public class MongoContext
    {
        private readonly MongoClient _client;
        private readonly IMongoDatabase _database;

        public MongoContext(IOptions<DatabaseSettings> dbOptions)
        {
            var settings = dbOptions.Value;
            _client = new MongoClient(settings.ConnectionString);
            _database = _client.GetDatabase(settings.DatabaseName);
        }

        public IMongoClient Client => _client;

        public IMongoDatabase Database => _database;
    }
}