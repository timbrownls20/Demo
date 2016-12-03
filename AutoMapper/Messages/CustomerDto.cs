using System;
using Automapper.Entities;
using Automapper.Infrastructure;

namespace Automapper.Messages
{
    public class CustomerDto
    {
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public AddressDto Address { get; set; }
        
        public override string ToString()
        {
            return new ToStringBuilder<CustomerDto>(this)
                        .Append(x => x.Name)
                        .Append(x => x.DateOfBirth)
                        .Append(x => x.Address)
                        .ToString();
        }
        
    }

}
