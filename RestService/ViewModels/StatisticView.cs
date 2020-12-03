using RestService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestService.ViewModels
{
    public class StatisticView
    {
        public User User { get; set; }
        public List<PaymentTransaction> Transactions { get; set; }
    }
}
