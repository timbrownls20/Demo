using System;
using MongoDB.Driver;

namespace loader
{
    class Program
    {
        public const string MONGODB_CONNECTION = "mongodb://localhost:27017";

        public static void Main(string[] args)
        {
            ListDatabases();
        }

        public static async void ListDatabases()
        {
            var client = new MongoClient(MONGODB_CONNECTION);
            using (var cursor = await client.ListDatabasesAsync())
            {
                await cursor.ForEachAsync(d => Console.WriteLine(d.ToString()));
            }
        }
    }
}
