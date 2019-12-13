namespace Geolocation.Core.ErrorHandling
{
    public class NotFoundException : BaseException
    {
        public NotFoundException(string lookupSubject, string lookupCondition) : 
            base(404, $"Couldn't find {lookupSubject} with {lookupCondition}.") { }
    }
}
