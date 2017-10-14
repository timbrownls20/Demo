using System.Text.RegularExpressions;
using System.Linq;
using HtmlAgilityPack;
using MongoDB.Driver;
using Tripitaka.Loader.Model;
using System.IO;
using Tripitaka.Loader.Extensions;

namespace Tripitaka.Loader.Provider
{
    internal class DhammapadaProvider: IProvider
    {

        public const string SITEBASE = @"source\tipitaka\kn\dhp";

        public void Load()
        {
            var database = new DBConnect().Connect();
            
            HtmlDocument index = new HtmlDocument(); 
            index.Load(Path.Combine(SITEBASE, "index.html").ToApplicationPath());  
            
            var links = index.DocumentNode.SelectNodes("//span[contains(@class, 'sutta_trans')]").Descendants("a");

            foreach(var link in links)
            {
                var chapterHref = Path.Combine(SITEBASE, link.Attributes["href"].Value).ToApplicationPath();
                var author = link.InnerText;

                //Acharya Buddharakkhita
                if(Regex.IsMatch(chapterHref, @"[\S\s]*\d[\S\s]budd[\S\s]*"))
                { 
                    //Console.WriteLine( $"loading {chapterHref}");
                    
                    HtmlDocument chapterPage = new HtmlDocument(); 
                    chapterPage.Load(chapterHref);
                    GetChapter(chapterPage, author, database);
                }
            }
        }

         public void GetChapter(HtmlDocument document, string author, IMongoDatabase database){
                
            
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