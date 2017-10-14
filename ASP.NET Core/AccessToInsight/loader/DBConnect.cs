

using MongoDB.Driver;

namespace Tripitaka.Loader
{
    internal class DBConnect
{
    public const string MONGODB_CONNECTION = "mongodb://localhost:27017";

    public IMongoDatabase Connect()
    {
        var client = new MongoClient(MONGODB_CONNECTION);
        client.DropDatabase("Tripitaka");   //.. temp measure to always start from fresh for now
        return client.GetDatabase("Tripitaka");        
    }
}
}

