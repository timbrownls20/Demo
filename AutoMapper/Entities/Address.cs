using System.Runtime.Remoting.Messaging;

namespace Automapper.Entities
{
    public class Address
    {
        public int Id { get; set; }
        public int? HouseNumber { get; set; }
        public string HouseName { get; set; }
        public string StreetName { get; set; }
        public string Town { get; set; }
    }

    
}