using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace RestService.Exeptions
{
    [Serializable]
    public class AppExeption : Exception
    {
        public AppExeption()
        : base("Произошла непредвиденная ошибка, просим прощения за предоставленные неудобства. Мы работаем над этим.")
        {
        }
        public AppExeption(string message)
        : base(message = "Пользователь не найден.")
        {
        }
        public AppExeption(string message, Exception innerException)
        : base(message, innerException)
        {
            if (innerException.GetType().Name != "AppExeption")
            {
                throw new AppExeption("Произошла непредвиденная ошибка, просим прощения за предоставленные неудобства. Мы работаем над этим.");
            }
        }
        
    }

}

