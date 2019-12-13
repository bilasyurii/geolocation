using FluentValidation.Results;
using System.Collections.Generic;

namespace Geolocation.Core.ErrorHandling
{
    public class FluentValidationException : BaseException
    {
        public FluentValidationException(IEnumerable<ValidationFailure> failures) : base(400, failures) { }
    }
}
