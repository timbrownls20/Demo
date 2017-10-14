

namespace Tripitaka.Loader.Repository
{
    public interface IRepository<T>
    {
        void Insert(T record);
    }
}