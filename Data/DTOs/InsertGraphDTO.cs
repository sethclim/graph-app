namespace CoreWebApi.Data.DTOs
{
    public class InsertGraphDTO
    {
        public string UserId { get; set; }
        public int[] Line { get; set; }
        public int[] Dots { get; set; }
        public int[] Points { get; set; }
        
        public int XMin { get; set; }
        public int XMax { get; set; }
        public int XStep{ get; set; }
        
        public int YMin { get; set; }
        public int YMax { get; set; }
        public int YStep { get; set; }
        
    }
}