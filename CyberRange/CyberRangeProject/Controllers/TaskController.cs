using CyberRangeProject.Data.Retriever;
using CyberRangeProject.Models.Other;
using CyberRangeProject.Models.Task;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CyberRangeProject.Controllers
{
	[ApiController]
	[Route("api/[controller]/[action]")]
	public class TaskController : Controller
	{
		private readonly TaskHandler taskHandler;
		private readonly IUserHandler userHandler;
		private readonly PlayerGameHandler pgh;
		private readonly PlayerTaskHandler pth;
		private readonly GameHandler gameHandler;
		private readonly GameTaskHandler gth;

		public TaskController(
			TaskHandler taskHandler,
			IUserHandler userHandler,
			PlayerGameHandler pgh,
			PlayerTaskHandler pth,
			GameHandler gameHandler,
			GameTaskHandler gth
			) {
			this.taskHandler = taskHandler;
			this.userHandler = userHandler;
			this.pgh = pgh;
			this.pth = pth;
			this.gameHandler = gameHandler;
			this.gth = gth;
		}

		[HttpGet]
		public string GetAllTask() {
			return JsonConvert.SerializeObject(taskHandler.GetAllTasks());
		}

		[HttpGet]
		[Authorize(Roles = "Admin")]
		public async Task<bool> DeleteTaskAsync([FromQuery]int taskId) {
			TaskModel task = taskHandler.GetTask(taskId);
			var deleteTaskResult = taskHandler.DeleteTask(task);
			var deletePt = await pth.DeletePlayerTaskAsync(task);
			var deleteGt = gth.DeleteGameTasks(taskId);
			return deleteTaskResult && deletePt && deleteGt;
		}

		[HttpGet]
		public string GetTask(int id) {
			string result = "Error in GetGame, could not find game";
			if (taskHandler.TaskExists(id))
				result = JsonConvert.SerializeObject(taskHandler.GetTask(id));
			return result;
		}

		[HttpGet]
		[Authorize]
		public async Task<PlayerTaskModel> GetPlayerTaskAsync(int taskId, int gameId) {
			var game = gameHandler.GetGame(gameId);
			var task = taskHandler.GetTask(taskId);
			var user = await userHandler.GetUserByEmail(HttpContext.User.Identity.Name);
			return await pth.GetPlayerTaskAsync(game, task, user);
		}

		[HttpPost]
		public IActionResult CreateTask([FromBody] TaskModel model) {
			if (string.IsNullOrWhiteSpace(model.TemplateName) || model.TemplateName == "") {
				model.TemplateName = "null";
			}
			if (model.Duration < 1) {
				model.Duration = 15;
			}
			if (model != null && taskHandler.CreateTask(model) != new TaskModel()) {
				return Ok();
			}
			return BadRequest();
		}

		[HttpPost]
		public bool EditTask([FromBody] TaskModel model) {
			var x = model;
			return taskHandler.UpdateGame(model);
		}

		[HttpPost]
		public string DeleteTask() {
			return JsonConvert.SerializeObject("test");
		}

		[HttpGet]
		[Authorize]
		public async Task<bool> SetTaskFinishedAsync(int taskid, int gameid) {
			var user = await userHandler.GetUserByEmail(HttpContext.User.Identity.Name);
			return await pth.SetTaskFinishedAsync(taskid, gameid, user);
		}
	}
}