using System;
using HtmlAgilityPack;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using System.Text.RegularExpressions;
using Tripitaka.Loader.Model;
using Tripitaka.Loader.Extensions;

using MongoDB.Driver;

namespace Tripitaka.Loader
{
    class Program
    {

        public const string SITEBASE = @"source\tipitaka\kn\dhp";
    
        public static void Main(string[] args)
        {   
            var dbConnnect = new DBConnect();

            Console.WriteLine("Loader on");
            var database = dbConnnect.Connect();
            
            HtmlDocument index = new HtmlDocument(); 
            index.Load(Path.Combine(SITEBASE, "index.html").ToApplicationPath());  
            
            var links = index.DocumentNode.SelectNodes("//span[contains(@class, 'sutta_trans')]").Descendants("a");

            // .. only do first few for now
            // links = links.Take(6);

            foreach(var link in links)
            {
                var chapterHref = Path.Combine(SITEBASE, link.Attributes["href"].Value).ToApplicationPath();
                var author = link.InnerText;

                //Acharya Buddharakkhita
                if(Regex.IsMatch(chapterHref, @"[\S\s]*\d[\S\s]budd[\S\s]*"))
                { 
                    Console.WriteLine( $"loading {chapterHref}");
                    
                    HtmlDocument chapterPage = new HtmlDocument(); 
                    chapterPage.Load(chapterHref);
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


    }
}
