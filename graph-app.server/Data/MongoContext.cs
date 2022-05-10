using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Diagnostics;
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
            var conn = Environment.GetEnvironmentVariable("MONGODB_CONNSTRING");
            Debug.WriteLine("Conn " + conn);
            _client = new MongoClient(conn);
            _database = _client.GetDatabase(settings.DatabaseName);
        }

        public IMongoClient Client => _client;

        public IMongoDatabase Database => _database;
    }
}