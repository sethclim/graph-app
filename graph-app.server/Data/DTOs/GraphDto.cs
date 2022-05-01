using CoreWebApi.Data.models;

namespace CoreWebApi.Data.DTOs
{
    public class GraphDto
    {
        public string UserId { get; set; }
        public Point[][] Line { get; set; }
        public Point[] Dots { get; set; }
        public Point[][] Points { get; set; }
        
        public int XMin { get; set; }
        public int XMax { get; set; }
        public int XStep{ get; set; }
        
        public int YMin { get; set; }
        public int YMax { get; set; }
        public int YStep { get; set; }
        
    }
}