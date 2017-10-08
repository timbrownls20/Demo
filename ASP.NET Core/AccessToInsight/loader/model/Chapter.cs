using System.Collections.Generic;
using MongoDB.Bson;

namespace Tripitaka.Loader.Model
{
    public class Chapter 
    {
        public Chapter()
        {
            Verses = new List<Verse>();
        }

        public ObjectId _id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public List<Verse> Verses { get; set; }
    }

}