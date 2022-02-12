using Automapper.Infrastructure;

namespace Automapper.Messages
{
    public class AddressDto
    {
        public int? HouseNumber { get; set; }
        public string HouseName { get; set; }
        public string StreetName { get; set; }
        public string Town { get; set; }
        public bool Residential { get; set; }

        public override string ToString()
        {
            return new ToStringBuilder<AddressDto>(this)
                        .Append(x => x.HouseNumber)
                        .Append(x => x.HouseName)
                        .Append(x => x.StreetName)
                        .Append(x => x.Town)
                        .Append(x => x.Residential)
                        .ToString();
        }
    }
}
