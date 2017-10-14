using Tripitaka.Loader.Provider;

namespace Tripitaka.Loader
{
    class Program
    {

        public static void Main(string[] args)
        {   
            IProvider provider = new DhammapadaProvider();
            provider.Load();
        }


    }
}
