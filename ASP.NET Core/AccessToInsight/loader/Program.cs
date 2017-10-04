using System;
using HtmlAgilityPack;
using MongoDB.Driver;
using System.Linq;
using System.Threading.Tasks;
using Tripitaka.Loader.Model;
using System.Text.RegularExpressions;

namespace Tripitaka.Loader
{
    class Program
    {
        public const string MONGODB_CONNECTION = "mongodb://localhost:27017";
        public const string SITEBASE = "http://www.accesstoinsight.org/tipitaka/kn/dhp";
    
        public static void Main(string[] args)
        {
            Console.WriteLine("Loader on");
            var database = DBConnect();


            HtmlWeb web = new HtmlWeb();  
            HtmlDocument index = web.Load(SITEBASE + "/index.html");  
            
            var links = index.DocumentNode.SelectNodes("//span[contains(@class, 'sutta_trans')]").Descendants("a");

            //.. only do first few for now
            //links = links.Take(6);

            foreach(var link in links)
            {
                var chapterHref = SITEBASE + "/" + link.Attributes["href"].Value;
                var author = link.InnerText;

                //Acharya Buddharakkhita
                if(Regex.IsMatch(chapterHref, @"[\S\s]*\d[\S\s]budd[\S\s]*"))
                { 
                    Console.WriteLine( $"loading {chapterHref}");

                    var chapterPage = web.Load(chapterHref);
                    GetChapter(chapterPage, author, database);
                }
            }

        }

        public static void GetChapter(HtmlDocument document, string author, IMongoDatabase database){
                
            
            var titleNode = document.DocumentNode.SelectNodes("//title").FirstOrDefault();  
            
            if(titleNode != null)
            {
                var chapter = new Chapter();
                chapter.Title = titleNode.InnerText;
                chapter.Author = author;

                var verses = document.DocumentNode.SelectNodes("//div[contains(@class, 'verse')]").Descendants("p");
                foreach(var verse in verses)
                {
                    string text = verse.InnerText;
                    var verseNumberString = verse.Descendants("b").FirstOrDefault().InnerText;
                    if (int.TryParse(Regex.Match(verseNumberString, @"\d+").Value, out var verseNumber))
                    {
                         chapter.Verses.Add(new Verse{ VerseNumber = verseNumber, Text = text});
                    }
        
                }

                var repository = new ChapterRepository(database);
                repository.Insert(chapter);
            }
        }

        public static IMongoDatabase DBConnect()
        {
             var client = new MongoClient(MONGODB_CONNECTION);
             client.DropDatabase("Tripitaka");   //.. temp measure to always start from fresh for now
             return client.GetDatabase("Tripitaka");        

           
             
        }




    }
}
