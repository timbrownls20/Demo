using System;
using PaliCanon.Loader.Model;
using PaliCanon.Loader.Provider;
using PaliCanon.Loader.Repository;

namespace PaliCanon.Loader
{
    class Program
    {

        public static void Main(string[] args)
        {   

            var database = new DBConnect().Connect();
            IProvider provider = new DhammapadaProvider(new ChapterRepository(database));
            provider.OnNotify += ConsoleNotify;

            provider.Load();
        }

        public static void ConsoleNotify(object sender, NotifyEventArgs args)
        {
            Console.WriteLine(args.Message);
        }
    }
}
