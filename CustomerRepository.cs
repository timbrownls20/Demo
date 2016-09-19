using System.Collections.Generic;
using System.Linq;
using Automapper.Entities;
using Automapper.Infrastructure;

namespace Automapper.Repositories
{
    public class CustomerRepository: IRepository<Customer>
    {
        private readonly DemoContext context;

        public CustomerRepository()
        {
            context = new DemoContext();
        }

        public List<Customer> ListAll()
        {
            return context.Customers.ToList();
        }

        public Customer FindById(int Id)
        {
            return context.Customers.SingleOrDefault(x => x.Id == Id);
        }

        public void Create(Customer entityIn)
        {
            context.Customers.Add(entityIn);
            context.SaveChanges();
        }

        public void Update(Customer entityIn)
        {
            context.Customers.Add(entityIn);
            context.SaveChanges();
        }

        public void Delete(Customer entityIn)
        {
            context.Customers.Remove(entityIn);
            context.SaveChanges();
        }
    }
}