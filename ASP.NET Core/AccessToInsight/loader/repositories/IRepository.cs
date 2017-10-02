

namespace Tripitaka.Loader.Model
{
    public interface IRepository<T>
    {
        void Insert(T record);
    }
}