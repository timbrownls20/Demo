using System;
using System.Collections.Generic;
using Automapper.Infrastructure;

namespace Automapper.Entities
{
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public virtual Address Address { get; set; }
        public CustomerType CustomerType { get; set; }

    }
    
    public enum CustomerType
    {
        Unspecified = 0,
        Consumer,
        Business
    }
}