using MongoDB.Bson;

namespace Tripitaka.Loader.Model
{
    public class Verse 
    {
        //public ObjectId _id { get; set; }
        public int VerseNumber {get; set; }
        public string Text { get; set; }
    }

}