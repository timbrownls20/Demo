

using MongoDB.Driver;

namespace PaliCanon.Common
{
    public class DBConnect
    {
        public const string MONGODB_CONNECTION = "mongodb://localhost:27017";

        public IMongoDatabase Connect()
        {
            var client = new MongoClient(MONGODB_CONNECTION);
            client.DropDatabase("PaliCanon");   //.. temp measure to always start from fresh for now
            return client.GetDatabase("PaliCanon");        
        }
    }
}

