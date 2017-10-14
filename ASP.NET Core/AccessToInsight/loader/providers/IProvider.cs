using System;

namespace Tripitaka.Loader.Provider
{
    interface IProvider: INotifier
    {
        void Load();

    }
}