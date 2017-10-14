using System;
using Tripitaka.Loader.Provider;

namespace Tripitaka.Loader
{
    class Program
    {

        public static void Main(string[] args)
        {   
            IProvider provider = new DhammapadaProvider();
            provider.OnNotify += ConsoleNotify;

            provider.Load();
        }

        public static void ConsoleNotify(object sender, NotifyEventArgs args)
        {
            Console.WriteLine(args.Message);
        }
    }
}
