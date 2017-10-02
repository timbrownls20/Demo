using System;
using HtmlAgilityPack;
using MongoDB.Driver;
using System.Linq;
using System.Threading.Tasks;
using Tripitaka.Loader.Model;

namespace Tripitaka.Loader
{
    class Program
    {
        public const string MONGODB_CONNECTION = "mongodb://localhost:27017";
        //public const string WEBPAGE = "http://www.accesstoinsight.org/tipitaka/kn/dhp/index.html";
        public const string WEBPAGE = "http://www.accesstoinsight.org/tipitaka/kn/dhp/dhp.01.budd.html";

        public static void Main(string[] args)
        {
            Console.WriteLine("Loader on");
            var database = DBConnect();


            HtmlWeb web = new HtmlWeb();  
            HtmlDocument document = web.Load(WEBPAGE);  
            var titleNode = document.DocumentNode.SelectNodes("//title").FirstOrDefault();  
            

            if(titleNode != null)
            {
                var chapter = new Chapter();
                chapter.Title = titleNode.InnerText;

                var repository = new ChapterRepository(database);
                repository.Insert(chapter);
            }


            //ListDatabases();
        }

        public static IMongoDatabase DBConnect()
        {
             var client = new MongoClient(MONGODB_CONNECTION);
             client.DropDatabase("Tripitaka");   //.. temp measure to always start from fresh for now
             return client.GetDatabase("Tripitaka");        

           
             
        }



        // public static async void ListDatabases()
        // {
        //     var client = new MongoClient(MONGODB_CONNECTION);
        //     client.DropDatabase("BookShelf");
        //     //client.GetDatabase()

        //     using (var cursor = await client.ListDatabasesAsync())
        //     {
        //         await cursor.ForEachAsync(d => Console.WriteLine(d.ToString()));
        //     }
        // }
    }
}
