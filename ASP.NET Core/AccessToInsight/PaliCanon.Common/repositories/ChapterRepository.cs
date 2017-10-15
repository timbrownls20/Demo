using MongoDB.Driver;
using PaliCanon.Common.Model;

namespace PaliCanon.Common.Repository
{
    public class ChapterRepository: IRepository<Chapter>
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
    }
}