﻿using Microsoft.AspNetCore.Mvc;
using RestService.Interface;
using RestService.Models;
using RestService.ViewModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RestService.Controllers
{
    [Route("api/")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentRepository _methods;
        public PaymentsController(IPaymentRepository payment)
        {
            _methods = payment;
        }

        [HttpGet("Balance")]
        [CustomExceptionFilterAttribute]
        public IActionResult Balance(Guid? userId)
        {
            var data = _methods.GetBalanceByUser(userId.Value);
            
            return Ok(data);
        }

        [HttpGet("History")]
        [CustomExceptionFilterAttribute]
        public IActionResult History(Guid userId, DateTime? from, DateTime? to)
        {
            var data = _methods.HistoryTransaction(userId, from, to);
            
            return Ok(data);

        }

        [HttpPost("AddTransaction")]
        [CustomExceptionFilterAttribute]
        
        public IActionResult AddTransaction(DateTime transactionTime, Guid userId, string notes, decimal amount)
        {
           
            if (string.IsNullOrWhiteSpace(notes)) { return NotFound("Не указан комментарий"); }
            var data = _methods.CreateTransaction(transactionTime, userId, notes, amount);
           
            return Ok(data);

        }


        [HttpGet("Statistic")]
        [CustomExceptionFilterAttribute]
        public IActionResult Statistic(DateTime? onDate)
        {
            var data = _methods.GetStatisticByDate(onDate);            
            return Ok(data);

        }

    }
}
