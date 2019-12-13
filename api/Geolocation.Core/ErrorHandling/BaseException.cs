using System;

namespace Geolocation.Core.ErrorHandling
{
    public class BaseException : Exception
    {
        private int code;
        private object info;
        public BaseException(int errorCode, object information)
        {
            code = errorCode;
            info = information;
        }

        public override string ToString()
        {
            var details = new ErrorDetails()
            {
                StatusCode = code,
                Information = info
            };
            return details.ToString();
        }
    }
}
