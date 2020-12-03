using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestService.Exeptions
{
    public class AppExeption:Exception
    {
        public AppExeption UserNotFound (string exMessage="Пользователь не найден.")
        {
              throw new Exception(exMessage);
        }
        public AppExeption PaymentException(string exMessage = "Недостаточно средств")
        {
            throw new Exception(exMessage);
        }
        public AppExeption ErrorService(Exception exception, string exMessage = "Произошла непредвиденная ошибка, просим прощения за предоставленные неудобства. Мы работаем над этим.")
        {
            var message = exception.Message;
            if (exception.TargetSite.DeclaringType.Name == "AppExeption")

            {
                throw new Exception(message);
            }
            throw new Exception(exMessage);
        }
    }
}
