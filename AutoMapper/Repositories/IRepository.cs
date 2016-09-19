using System.Collections.Generic;

namespace Automapper.Repositories
{
    public interface IRepository<T>
    {
        List<T> ListAll();
        T FindById(int Id);
        void Create(T entityIn);
        void Update(T entityIn);
        void Delete(T entityIn);
    }
}