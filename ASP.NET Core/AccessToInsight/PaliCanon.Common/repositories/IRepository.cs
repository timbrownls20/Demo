

namespace PaliCanon.Common.Repository
{
    public interface IRepository<T, U>
    {
        void Insert(T record);

        T Get(U id);
    }
}