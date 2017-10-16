using MongoDB.Driver;
using MongoDB.Driver.Linq;
using PaliCanon.Common.Model;

namespace PaliCanon.Common.Repository
{
    public class ChapterRepository: IChapterRepository
    {
        IMongoDatabase database;

        public ChapterRepository(IMongoDatabase database)
        {
            this.database = database;    
        }

        public void Insert(Chapter record)
        {
            var collection = database.GetCollection<Chapter>(nameof(Chapter));
            collection.InsertOne(record);
        }

        public Chapter Get(int id)
        { 
             var collection = database.GetCollection<Chapter>(nameof(Chapter));

             var temp = collection.Find(_ => true).ToList();

             var chapter = collection.AsQueryable<Chapter>().Where(x => x.ChapterNumber == id).SingleOrDefault();
             return chapter;
        }
    }
}