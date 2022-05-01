using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CoreWebApi.Data.models
{
    public class User{
        [BsonId]
        public ObjectId Id {get; set;}

        [BsonElement("Name")]
        public string Name {get; set;}
        
        [BsonElement("Email")]  
        public string Email { get; set; }
        
        [BsonElement("Password")]
        public string Password { get; set; }

        [BsonElement("Graphs")]
        public Graph[] Graphs { get; set; }
    }
}
