using Microsoft.EntityFrameworkCore;
using RestService.AppContexts;
using RestService.Exeptions;
using RestService.Interface;
using RestService.Models;
using RestService.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;

namespace RestService.Repositories
{
    public class PaymentReposiroty : IPaymentRepository
    {
        private DB_Context _context;
        public PaymentReposiroty(DB_Context db)
        {
            _context = db;
        }
        public decimal? GetBalanceByUser(Guid userId)
        {
            try
            {
                var user = _context.Users.FirstOrDefault(w => w.UserId == userId);
                return user == null ? 0 : user.Amount;
            }
            catch (Exception exc)
            {
                new AppExeption().ErrorService(exc);
                return 0;
            }
        }
        public List<PaymentTransaction> HistoryTransaction(Guid userId, DateTime? from, DateTime? to)
        {
            try
            {
                var rezult = _context.Transactions
                    .Where(w => w.UserId == userId
                    && (from != null ? w.TransactionTime >= from : true)
                    && (from != null ? w.TransactionTime >= to : true))
                    .ToList();
                return rezult;
            }
            catch (Exception exc)
            {
                new AppExeption().ErrorService(exc);
                return new List<PaymentTransaction>();
            }
        }
        public string CreateTransaction(DateTime transactionTime, Guid userId, string notes, decimal amount)
        {
            try
            {
                var user = _context.Users.FirstOrDefault(f => f.UserId == userId);
                var transaction = new PaymentTransaction();
                if (user != null)
                {
                    if ((user.Amount - amount) <= 0)
                    {
                        new AppExeption().PaymentException();
                    }
                    transaction = new PaymentTransaction(transactionTime, userId, notes, amount);
                    _context.Transactions.Add(transaction);
                    user.Amount -= amount;
                    _context.SaveChanges();
                }
                else
                {
                    new AppExeption().UserNotFound();
                }
                return "Транзакция успешна. Ид транзакции: " + transaction.TransactionId;
            }
            catch (Exception exc)
            {
                new AppExeption().ErrorService(exc);
                return "";
            }
        }


        public List<StatisticView> GetStatisticByDate(DateTime? onDate)
        {
            try
            {
                var rezults = _context.Transactions
                    .Where(w => (onDate != null ? w.TransactionTime == onDate : true))
                    .Select(s =>
                    new StatisticView()
                    {
                        FIO = s.User.Family + s.User.Name + s.User.Patronymic,
                        Amount = s.Amount,
                        Notes = s.Notes,
                        TransactionTime = s.TransactionTime
                    }).ToList();
                if (rezults.Count == 0)
                {
                    new AppExeption().UserNotFound("За данную дату ничего не найдено.");
                }
                return rezults;
            }
            catch (Exception exc)
            {
                new AppExeption().ErrorService(exc);
                return new List<StatisticView>();
            }
        }
    }
}
