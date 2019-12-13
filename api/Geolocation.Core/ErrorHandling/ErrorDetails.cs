using Newtonsoft.Json;

namespace Geolocation.Core.ErrorHandling
{
    public class ErrorDetails
    {
        public int StatusCode { get; set; }
        public object Information { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
