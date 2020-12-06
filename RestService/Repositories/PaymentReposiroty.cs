using RestService.AppContexts;
using RestService.Exeptions;
using RestService.Interface;
using RestService.Models;
using RestService.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;

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
                if (user == null) { throw new AppExeption("Пользователь не найден"); }
                return user.Amount;
            }
            catch (Exception exc)
            {
                throw new AppExeption(exc.Message, exc);

            }
        }

        public List<TransactionView> HistoryTransaction(Guid userId, DateTime? from, DateTime? to)
        {
            try
            {
                var rezult = _context.Transactions
                    .Where(w => w.UserId == userId
                    && (from != null ? w.TransactionTime.Date >= from.Value.Date : true)
                    && (to != null ? w.TransactionTime.Date <= to.Value.Date : true)).Select(s =>
                    new TransactionView()
                    {
                        FIO = s.User.getUserFIO(),
                        Amount = s.Amount,
                        Notes = s.Notes,
                        TransactionTime = s.TransactionTime,
                        UserId = s.UserId,
                        TransactionId = s.TransactionId                        
                    }).ToList();
                   
                if (rezult.Count == 0) { throw new AppExeption("История операция по заданным параметрам не найдена."); }
                return rezult;
            }
            catch (Exception exc)
            {
                throw new AppExeption(exc.Message, exc);

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
                        throw new AppExeption("Недостаточно средств на счету.");
                    }
                    transaction = new PaymentTransaction(transactionTime, userId, notes, amount);
                    _context.Transactions.Add(transaction);
                    user.Amount -= amount;
                    _context.SaveChanges();
                }
                else
                {
                    throw new AppExeption("Пользователь не найден");
                }
                return "Транзакция успешна. Ид транзакции: " + transaction.TransactionId;
            }
            catch (Exception exc)
            {
                throw new AppExeption(exc.Message, exc);

            }
        }


        public List<TransactionView> GetStatisticByDate(DateTime? onDate)
        {
            try
            {
                var rezults = _context.Transactions
                    .Where(w => (onDate != null ? (w.TransactionTime.Date.Date == onDate.Value.Date) : true))
                    .Select(s =>
                    new TransactionView()
                    {
                        FIO = s.User.getUserFIO(),
                        Amount = s.Amount,
                        Notes = s.Notes,
                        TransactionTime = s.TransactionTime,
                        UserId = s.UserId,
                        TransactionId = s.TransactionId
                    }).ToList();
                if (rezults.Count == 0)
                {
                    throw new AppExeption("За данную дату ничего не найдено.");
                }
                return rezults;
            }
            catch (Exception exc)
            {
                throw new AppExeption(exc.Message, exc);

            }
        }
    }
}
