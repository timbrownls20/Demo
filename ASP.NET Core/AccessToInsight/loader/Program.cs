using System;
using Tripitaka.Loader.Model;
using Tripitaka.Loader.Provider;
using Tripitaka.Loader.Repository;

namespace Tripitaka.Loader
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
