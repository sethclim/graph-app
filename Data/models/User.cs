using System;
using System.Collections.Generic;
using CoreWebApi.Data.models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class User{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id {get; set;}

    [BsonElement("Name")]
    public string Name {get; set;}
    
    [BsonElement("Graphs")]
    public Graph[] Graphs { get; set; }
}