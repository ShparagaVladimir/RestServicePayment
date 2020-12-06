using Microsoft.AspNetCore.Mvc;
using RestService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestService.ViewModels
{
    public class TransactionView
    { 

        /// <summary>
        /// ФИО пользователя
        /// </summary>
        public string FIO { get; set; }
        /// <summary>
        /// Дата транзакции
        /// </summary>
        public DateTime TransactionTime { get; set; }
        /// <summary>
        /// Комментарий
        /// </summary>        
        public string Notes { get; set; }
        /// <summary>
        /// Сумма транзакции
        /// </summary>
        public decimal Amount { get; set; }
        /// <summary>
        /// Ид пользователя
        /// </summary>
        public Guid  UserId { get; set; }

        /// <summary>
        /// Ид транзакции
        /// </summary>
        public Guid TransactionId { get; set; }

       

    }
}
