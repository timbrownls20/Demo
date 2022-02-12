using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using Automapper.Entities;

namespace Automapper.Infrastructure
{
    public class DemoContext: DbContext
    {
        public DemoContext() : base("DemoContext")
        {
        }

        public DbSet<Customer> Customers { get; set; }
        
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}