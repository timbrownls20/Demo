using System;
using System.Collections.Generic;
using Automapper.Entities;


namespace Automapper.Infrastructure
{
    //public class DemoInitialiser: System.Data.Entity. DropCreateDatabaseIfModelChanges<DemoContext>
    public class DemoInitialiser: System.Data.Entity. DropCreateDatabaseAlways<DemoContext>
    {
        protected override void Seed(DemoContext context)
        {
            var patients = new List<Customer>
            {
               
                new Customer
                {
                    Id = 1,
                    Name = "Lord of the manor",
                    DateOfBirth = DateTime.Now.AddYears(-20),
                    CustomerType = CustomerType.Consumer,
                    Address = new Address {HouseName = "Downton Abbey", Town = "Ripon" }
                },
                new Customer
                {
                    Id = 2,
                    Name = "Captain of industry",
                    DateOfBirth = DateTime.Now.AddYears(-30),
                    CustomerType = CustomerType.Business,
                    Address = new Address {HouseNumber = 10, StreetName = "Factory Lane", Town = "Brummidge" }
                },
            };

            patients.ForEach(p => context.Customers.Add(p));
            context.SaveChanges();
        }
    }
}