using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CoreWebApi.Data.models
{
    public class Graph
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        
        //Graph Contents
        public Point[][] Line { get; set; }
        public Point[] Dots { get; set; }
        public Point[][] Points { get; set; }
        
        //Graph Meta Data
        public int XMin { get; set; }
        public int XMax { get; set; }
        public int XStep{ get; set; }
        
        public int YMin { get; set; }
        public int YMax { get; set; }
        public int YStep { get; set; }
    }
}