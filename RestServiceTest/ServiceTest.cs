using System;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

using RestService;
using Xunit;

namespace WideWorldImporters.API.IntegrationTests
{
    public class ServiceTest : IClassFixture<TestStartup<Startup>>
    {
        private HttpClient Client;

        public ServiceTest(TestStartup<Startup> fixture)
        {
            Client = fixture.Client;
        }

        [Fact]
        public async Task TestGetBalance()
        {
            // Arrange
            decimal amount = 500;
            
            var request = "/api/Balance?userId=5E69707B-5A13-4361-99D8-CAACEE037C06";

            // Act
            var response = await Client.GetAsync(request);
           
            var amountQuestion  = decimal.Parse(response.Content.ReadAsStringAsync().Result, CultureInfo.InvariantCulture);
            
            // Assert
            response.EnsureSuccessStatusCode();
                 
            Assert.True(amount.Equals(amountQuestion));
        }
        [Fact]
        public async Task TestGetHistoryNotData()
        {
            // Arrange
            var request = "/api/History?userId=5E69707B-5A13-4361-99D8-CAACEE037C06";

            // Act
            var response = await Client.GetAsync(request);         
            

            // Assert
            response.EnsureSuccessStatusCode();


            
        }
        [Fact]
        public async Task TestGetStatistic()
        {
            // Arrange
           

            var request = "/api/Statistic?onDate=2020-12-12";

            // Act
            var response = await Client.GetAsync(request);
           
            

            // Assert
            response.EnsureSuccessStatusCode();

           
        }
        [Fact]
        public async Task TestPostAddTransactionParametr()
        {
            // Arrange           
            var request = "/api/AddTransaction?userId=5E69707B-5A13-4361-99D8-CAACEE037C06&amount=3500&notes=Кросовки&transactionTime="+DateTime.Now;

            // Act
            var response = await Client.PostAsync(request, ContentHelper.GetStringContent(""));
                      

            // Assert
            response.EnsureSuccessStatusCode();
           
        }
       
    }
}