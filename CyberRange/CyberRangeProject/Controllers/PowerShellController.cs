using CyberRangeProject.Powershell;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CyberRangeProject.Controllers {

	[Route("api/[controller]/[action]")]
	public class PowerShellController : Controller {

		[HttpGet]
		public async Task RunAsync() {
			RunScript scriptRunner = new RunScript();
			Dictionary<string, object> parameterList = new Dictionary<string, object>();
			parameterList.Add("UbuntuTestVm", "start");
			string scriptText = System.IO.File.ReadAllText(@"C:\Users\stian\Documents\Bachelor\. WEB PLATFORM\CyberRange\CyberRangeProject\Powershell\Start-Stop-Restart-SingleVm-using-args.ps1");
			await scriptRunner.Run(scriptText, parameterList);
		}
	}
}