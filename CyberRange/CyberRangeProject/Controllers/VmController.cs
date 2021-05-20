using CyberRangeProject.Azure;
using CyberRangeProject.Data.Retriever;
using CyberRangeProject.Models.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CyberRangeProject.Controllers
{
	[Route("api/[controller]/[action]")]
	public class VmController : Controller
	{
		private readonly GameHandler gameHandler;
		private readonly PlayerGameHandler pgh;
		private readonly GameTaskHandler gth;
		private readonly TaskHandler th;
		private readonly PlayerTaskHandler pth;
		private readonly AzureApi aapi;
		private readonly VirtualMachineHandler vmh;
		private readonly IUserHandler userHandler;

		public VmController(
			GameHandler gameHandler,
			PlayerGameHandler pgh,
			GameTaskHandler gth,
			TaskHandler th,
			PlayerTaskHandler pth,
			AzureApi aapi,
			VirtualMachineHandler vmh,
			IUserHandler userHandler
			) {
			this.gameHandler = gameHandler;
			this.pgh = pgh;
			this.gth = gth;
			this.th = th;
			this.pth = pth;
			this.aapi = aapi;
			this.vmh = vmh;
			this.userHandler = userHandler;
		}

		[HttpGet]
		public async Task<List<object>> GetAllVmInfoAsync() {
			var bearer = await aapi.GetBearerTokenAsync();
			var allVms = await aapi.GetAllVmAsync(bearer);

			List<object> result = new List<object>();
			foreach (var vm in allVms) {
				var origin = vmh.FindOrigin(vm);
				var user = new CyberSparrow();
				if (origin != "unknown") {
					var originObject = Newtonsoft.Json.JsonConvert.DeserializeObject<dynamic>(origin);
					var userId = originObject[0]["PlayerId"];
					if (userId == null || string.IsNullOrWhiteSpace(userId.ToString())) {
						var obj = originObject[0];
						var usrobj = originObject[0]["User"];
						//user = obj["Id"];
						user = usrobj.ToObject<CyberSparrow>();
						userId = null;
					}
					if (userId != null) {
						var userIdString = userId.ToString();
						//userIdString = userId.Split(new char[] { '{', '}' }, StringSplitOptions.RemoveEmptyEntries);
						user = userHandler.GetUserById(userIdString);
					}
				}
				//var originUser = userHandler.GetUserById(originObject);
				var x = new {
					vmName = vm,
					origin = vmh.FindOrigin(vm),
					player = user
				};
				result.Add(x);
			}
			return result;
		}

		[HttpGet]
		[Authorize(Roles = "Admin")]
		public async Task<string> KillSwitchAsync([FromQuery] string name) {
			var bearer = await aapi.GetBearerTokenAsync();
			return await aapi.StopAllVmAsync(bearer);
		}
		[HttpGet]
		[Authorize(Roles = "Admin")]
		public async Task<string> DeleteVmAsync([FromQuery] string name) {
			var bearer = await aapi.GetBearerTokenAsync();
			return await aapi.DeleteVmAndAllResources(bearer, name);
		}
		[HttpGet]
		public async Task<string> GetVmInfoFromGameForUserAsync(int gameId) {
			var context = HttpContext.User;
			var user = await userHandler.GetUserByEmail(HttpContext.User.Identity.Name);
			if (user == null)
				return "USER WAS NOT FOUND!";

			var bearer = await aapi.GetBearerTokenAsync();
			var playerGame = pgh.GetPlayerGame(gameId, user.Id);
			return await aapi.GetInfoOnVmAsync(bearer, playerGame.ToolVmIdentifier);
		}

		[HttpGet]
		public async Task<string> GetVmInfoOnTaskForUserAsync(int taskId, int gameId) {
			var context = HttpContext.User;
			var user = await userHandler.GetUserByEmail(HttpContext.User.Identity.Name);

			var bearer = await aapi.GetBearerTokenAsync();

			var game = gameHandler.GetGame(gameId);
			var task = th.GetTask(taskId);
			if (user == null || game == null || task == null)
				return "VARIABLE IS NULL";
			var PlayerTask = await pth.GetPlayerTaskAsync(game, task, user);

			return await aapi.GetInfoOnVmAsync(bearer, PlayerTask.VmName);
		}

		[HttpGet]
		public async Task<object> GetVmIpForGame(int gameId) {
			var context = HttpContext.User;
			var user = await userHandler.GetUserByEmail(HttpContext.User.Identity.Name);
			if (user == null)
				return "USER WAS NOT FOUND!";

			var bearer = await aapi.GetBearerTokenAsync();
			var playerGame = pgh.GetPlayerGame(gameId, user.Id);
			var ip = await aapi.GetVmIp(bearer, playerGame.ToolVmIdentifier);
			return new { ip };
		}

		[HttpGet]
		public async Task<object> GetVmIpForTask(int taskId, int gameId) {
			var context = HttpContext.User;
			var user = await userHandler.GetUserByEmail(HttpContext.User.Identity.Name);

			var bearer = await aapi.GetBearerTokenAsync();
			var game = gameHandler.GetGame(gameId);
			var task = th.GetTask(taskId);
			if (user == null || game == null || task == null)
				return "VARIABLE IS NULL";

			var PlayerTask = await pth.GetPlayerTaskAsync(game, task, user);
			var ip = await aapi.GetVmIp(bearer, PlayerTask.VmName);
			return new { ip };
		}

		[HttpGet]
		public async Task<List<string>> GetVmTemplates() {
			var templates = await aapi.GetAllTemplatesAsync();
			templates.Add("Null");
			return templates;
		}

		[HttpPost]
		public async Task<string> DeleteVmTemplateAsync() {
			var bearer = await aapi.GetBearerTokenAsync();
			return await aapi.DeleteVmScheduleAsync(bearer, DateTime.Now, "CTF-Demo-20210415T103018Z");
		}
	}
}