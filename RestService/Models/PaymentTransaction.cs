using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestService.Models
{
    public class PaymentTransaction
    {


        public PaymentTransaction() { }

        public PaymentTransaction(PaymentTransaction s)
        {
            TransactionId = s.TransactionId;
            TransactionTime = s.TransactionTime;
            UserId = s.UserId;
            Notes = s.Notes;
            Amount = s.Amount;
        }

        public PaymentTransaction(DateTime transactionTime, Guid userId, string notes, decimal amount)
        {
            TransactionId = Guid.NewGuid();
            TransactionTime = transactionTime;
            UserId = userId;
            Notes = notes;
            Amount = amount;
        }



        /// <summary>
        /// ИД Транзакции
        /// </summary>
        [Key]
        public Guid TransactionId { get; set; }
        /// <summary>
        /// Дата транзакции
        /// </summary>
        public DateTime TransactionTime { get; set; }
        /// <summary>
        /// Ид пользователя
        /// </summary>
        public Guid UserId { get; set; }
        /// <summary>
        /// Комментарий
        /// </summary>
        [MaxLength(200)]
        public string Notes { get; set; }
        /// <summary>
        /// Сумма транзакции
        /// </summary>
        public decimal Amount { get; set; }

        public virtual User User { get; set; }
    }
}
