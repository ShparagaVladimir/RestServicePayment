using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using RestService.Interface;

namespace RestService.Models
{
    public class User
    {
        /// <summary>
        /// Уникальный Идентификатор пользователя
        /// </summary>
        [Key]
        public Guid UserId { get; set; }
        /// <summary>
        /// Имя
        /// </summary>
        [MaxLength(50)]
        public string Name { get; set; }
        /// <summary>
        /// Фамилия
        /// </summary>
        [MaxLength(50)]
        public string Family { get; set; }
        /// <summary>
        /// Отчество
        /// </summary>
        [MaxLength(50)]
        public string Patronymic { get; set; }
        /// <summary>
        /// Средства пользователя
        /// </summary>
        public decimal Amount { get; set; }

        public virtual List<PaymentTransaction> Transactions { get; set; } = new List<PaymentTransaction>();
    }
}
