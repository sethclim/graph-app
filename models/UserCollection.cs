using MongoDB.Driver;
using System;
using System.Collections.Generic;

public class UserCollection
{
    public IMongoCollection<User> Users { get; }


    public UserCollection()
    {
        var client = new MongoClient("mongodb://localhost:27017");
        var database = client.GetDatabase("GraphDataStore");
        Users = database.GetCollection<User>("Users");

        //CatalogContextSeed.SeedData(Products);



        List<User> list = Users.Find<User>
                (p => true).ToList<User>();

        foreach (User user in list)
        {
            Console.WriteLine($"USERID: {user.Id} - User Name: {user.Name}");
        }
    }
}
