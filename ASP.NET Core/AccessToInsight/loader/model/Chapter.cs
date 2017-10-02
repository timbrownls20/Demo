using MongoDB.Bson;

namespace Tripitaka.Loader.Model
{
    public class Chapter 
    {
        public ObjectId _id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
    }

}