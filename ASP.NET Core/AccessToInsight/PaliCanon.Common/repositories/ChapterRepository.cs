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

        //public Chapter Get(string bookCode, int chapter, int? verse)
        public Chapter Get(string bookCode, int chapterId, int? verse)
        { 
             var collection = database.GetCollection<Chapter>(nameof(Chapter));
             var chapter = collection.AsQueryable<Chapter>().Where(x => x.ChapterNumber == chapterId && x.BookCode == bookCode).SingleOrDefault();
             

            if(verse.HasValue)
            {
                chapter.Verses.RemoveAll(x => x.VerseNumber != verse);
            }

             return chapter;
        }
    }
}