using Microsoft.AspNetCore.Mvc;
using RestService.Models;
using RestService.ViewModels;
using System;
using System.Collections.Generic;

namespace RestService.Interface
{
    public interface IPaymentRepository
    {
        /// <summary>
        /// Метод получения остатка счета пользователя
        /// </summary>
        /// <param name="userId">Ид пользователя</param>
        /// <returns></returns>
        decimal? GetBalanceByUser(Guid userId);
        /// <summary>
        /// История тразакция 
        /// </summary>
        /// <param name="userId">Ид пользователя</param>
        /// <param name="from">Дата с</param>
        /// <param name="to">Дата по</param>
        /// <returns></returns>
        List<TransactionView> HistoryTransaction(Guid userId, DateTime? from, DateTime? to);
        /// <summary>
        /// Транзакция(Списание средств)
        /// </summary>
        /// <param name="transactionTime">Дата транзакции</param>
        /// <param name="userId">Ид пользователя</param>
        /// <param name="notes">Комментарий</param>
        /// <param name="amount">Сумма</param>
        /// <returns></returns>
        string CreateTransaction(DateTime transactionTime, Guid userId, string notes, decimal amount);
        /// <summary>
        /// Статистика по операциям пользователя
        /// </summary>
        /// <param name="onDate">Дата за которую предоставить отчет</param>
        /// <returns></returns>
        List<TransactionView> GetStatisticByDate(DateTime? onDate);
    }
}
