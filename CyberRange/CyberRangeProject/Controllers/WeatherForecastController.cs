using CyberRangeProject.Azure;
using CyberRangeProject.Helpers.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CyberRangeProject.Controllers {

	[ApiController]
	[Route("api/[controller]/[action]")]
	public class WeatherForecastController : ControllerBase {

		private static readonly string[] Summaries = new[]
		{
			"Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
		};

		private readonly ILogger<WeatherForecastController> _logger;

		public WeatherForecastController(ILogger<WeatherForecastController> logger) {
			_logger = logger;
		}

		[HttpGet]
		public async Task<string> GetAsync() {
			AzureApi api = new AzureApi();

			string bearerToken = await api.GetBearerTokenAsync();

			//return await api.CreateVm(bearerToken);
			await api.GetAllVmAsync(bearerToken);
			return "";
			//return await api.RemoveVmWithTags(bearerToken, "Tezt", "wabaduu");
			//await api.CreateVm(bearerToken);
		}

		[HttpGet]
		public string CreateVM() {
			AzureManagement test = new AzureManagement();
			test.Login();
			return "1";
		}
	}
}