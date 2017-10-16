using System.Text.RegularExpressions;
using System.Linq;
using HtmlAgilityPack;
using System.IO;
using MongoDB.Driver;
using System;
using PaliCanon.Common.Repository;
using PaliCanon.Common.Extensions;
using PaliCanon.Common.Model;

namespace PaliCanon.Loader.Provider
{

    internal class DhammapadaProvider: IProvider
    {

        private const string SITEBASE = @"source\tipitaka\kn\dhp";
        private IRepository<Chapter> chapterRepository;
      
        public event EventHandler<NotifyEventArgs> OnNotify;

        public DhammapadaProvider(IRepository<Chapter> chapterRepository)
        {
            this.chapterRepository = chapterRepository;
        }


        public void Load()
        {
            
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

                    
                    var message = $"loading {chapterHref}";
                    if(OnNotify != null) OnNotify(this, new NotifyEventArgs(message));

                    HtmlDocument chapterPage = new HtmlDocument(); 
                    chapterPage.Load(chapterHref);
                    GetChapter(chapterPage, author);
                }
            }
        }

         public void GetChapter(HtmlDocument document, string author){
                
            
            var titleNode = document.DocumentNode.SelectNodes("//title").FirstOrDefault();  
            
            if(titleNode != null)
            {
                var chapter = new Chapter();
                chapter.Title = titleNode.InnerText;
                chapter.Author = author;
                chapter.Nikaya = "Khuddaka";
                chapter.Book = "Dhammapada";

                var verses = document.DocumentNode.SelectNodes("//div[contains(@class, 'verse')]").Descendants("p");
                foreach(var verse in verses)
                {
                    var verseNumberString = verse.Descendants("b").FirstOrDefault().InnerText;
                    if (int.TryParse(Regex.Match(verseNumberString, @"\d+").Value, out var verseNumber))
                    {
                        var verseNodes = verse.ChildNodes.Skip(1).Select(x => x.InnerText).ToArray();
                        var verseText = string.Join("", verseNodes);
                        chapter.Verses.Add(new Verse{ VerseNumber = verseNumber, Text = verseText});
                    }
        
                }

                chapterRepository.Insert(chapter);
            }
        }
    }
}