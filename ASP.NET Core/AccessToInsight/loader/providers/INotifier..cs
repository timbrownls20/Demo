using System;

namespace Tripitaka.Loader.Provider
{
    interface INotifier
    {
        event EventHandler<NotifyEventArgs> OnNotify;
    }
}