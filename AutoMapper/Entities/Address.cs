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
        //public AddressType AddressType { get; set; }

 
    }

    //public enum AddressType
    //{
    //    Home = 0,
    //    Business
    //}
}