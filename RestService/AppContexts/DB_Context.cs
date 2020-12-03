using Microsoft.EntityFrameworkCore;
using RestService.Models;
using System;

namespace RestService.AppContexts
{
    public class DB_Context : DbContext
    {
        public DB_Context(DbContextOptions<DB_Context> options) : base(options)
        {

            Database.EnsureCreated();
        }
        public DbSet<User> Users { get; set; }
        public DbSet<PaymentTransaction> Transactions { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany(c => c.Transactions)
                .WithOne(o => o.User)
                .HasForeignKey(h => h.UserId);

            modelBuilder.Entity<User>().HasData(
                new User[]
                {
                new User { UserId=new System.Guid("5E69707B-5A13-4361-99D8-CAACEE037C06"), Name="Ivan", Family="Ivanov",Patronymic="Ivanovich",Amount=5000},
                new User { UserId= Guid.NewGuid(), Name="Alice", Family="Tworek",Patronymic="Noproblemo",Amount=50000},

                });
            modelBuilder.Entity<PaymentTransaction>().HasData(
              new PaymentTransaction[]
              {
                new PaymentTransaction { UserId=new System.Guid("5E69707B-5A13-4361-99D8-CAACEE037C06"), TransactionTime=DateTime.Now, Notes="Ботинки",Amount=3500,TransactionId = Guid.NewGuid()},
                new PaymentTransaction { UserId=new System.Guid("5E69707B-5A13-4361-99D8-CAACEE037C06"),TransactionTime=DateTime.Now, Notes ="Магазин" ,Amount=5000,TransactionId = Guid.NewGuid()},
                new PaymentTransaction { UserId=new System.Guid("5E69707B-5A13-4361-99D8-CAACEE037C06"), TransactionTime=DateTime.Now,Notes="SSD",Amount=5000,TransactionId = Guid.NewGuid()},

              });
        }

    }

}
