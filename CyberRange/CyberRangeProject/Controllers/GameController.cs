using CyberRangeProject.Azure;
using CyberRangeProject.Data.Retriever;
using CyberRangeProject.Models.Game;
using CyberRangeProject.Models.Other;
using CyberRangeProject.Models.Task;
using CyberRangeProject.Models.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CyberRangeProject.Controllers
{
	[Route("api/[controller]/[action]")]
	public class GameController : Controller
	{
		private readonly GameHandler gameHandler;
		private readonly PlayerGameHandler pgh;
		private readonly UserManager<CyberSparrow> userManager;
		private readonly IUserHandler userHandler;
		private readonly GameTaskHandler gth;
		private readonly TaskHandler th;
		private readonly PlayerTaskHandler pth;
		private readonly AzureApi aapi;
		private readonly VirtualMachineHandler vmh;

		public GameController(
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
			this.userManager = userManager;
			this.userHandler = userHandler;
			this.gth = gth;
			this.th = th;
			this.pth = pth;
			this.aapi = aapi;
			this.vmh = vmh;
		}

		[HttpPost]
		public string Create([FromBody] GameModel model) {
			Console.WriteLine(model);
			if (model == null || !ModelState.IsValid) {
				System.Collections.Generic.List<string> errorList = (from item in ModelState
																	 where item.Value.Errors.Any()
																	 select item.Value.Errors[0].ErrorMessage).ToList();
				var x = JsonConvert.SerializeObject(errorList);
				return x;
			}
			var g = model;
			var result = JsonConvert.SerializeObject(StatusCode(200));
			var entity = gameHandler.CreateGame(model);
			var entityJson = JsonConvert.SerializeObject(entity);
			return entityJson;
		}

		[HttpGet]
		public string GetGame(int id) {
			string result = "Error in GetGame, could not find game";
			if (gameHandler.GameExists(id))
				result = JsonConvert.SerializeObject(gameHandler.GetGame(id));
			return result;
		}

		[HttpGet]
		public IActionResult StartGame() {
			return View();
		}

		[HttpGet]
		public IActionResult StopGame() {
			return View();
		}

		[HttpPost]
		public bool EditGame([FromBody] GameModel model) {
			var x = model;
			return gameHandler.UpdateGame(model);
		}

		[HttpGet]
		public string All() {
			return JsonConvert.SerializeObject(gameHandler.GetAllGames());
		}

		[HttpGet]
		[Authorize]
		public async Task<string> ParticipateGameAsync(int id) {
			string result = "Error in ParticipateGame, could not find game";
			var context = HttpContext.User;
			var user = await userHandler.GetUserByEmail(HttpContext.User.Identity.Name);
			if (user == null) {
				return "USER WAS NOT FOUND!";
			}
			if (gameHandler.GameExists(id) && !pgh.PlayerHasParticipated(id, user.Id)) {
				result = JsonConvert.SerializeObject(pgh.ParticipateGame(id, user.Id));
			} else {
				return result;
			}
			//DELETE TOOL VM WHEN GAME TIME IS OUT
			var game = gameHandler.GetGame(id);
			var GameEndTime = game.EndDate;
			//START TOOL VM
			if (!string.IsNullOrWhiteSpace(game.VmTemplate) && game.VmTemplate.ToLower() != "null") {
				var bearer = await aapi.GetBearerTokenAsync();
				var toolsVmName = await aapi.CreateTaskVmAsync(bearer, game.VmTemplate);
				//Because job is required to be 15 minutes in the future
				await aapi.DeleteVmScheduleAsync(bearer, GameEndTime, toolsVmName);
				//ADD TOOL VM TO DB
				var vmEntity = await vmh.CreateVirtualMachineEntityAsync(toolsVmName, user);
				vmEntity.IsGame = true;
				vmEntity.GameId = id;
				vmh.UpdateVMEntity(vmEntity);
				//Update playerGame table
				var playerGame = pgh.GetPlayerGame(id, user.Id);
				playerGame.ToolVmIdentifier = toolsVmName;
				playerGame.ToolVmCreated = true;
				pgh.UpdateGame(playerGame);
			}

			//CREATE PLAYERTASK FOR ALL TASKS IN GAME
			var gameTasks = gth.GetAllTasksForGame(id);
			List<TaskModel> taskList = new List<TaskModel>();
			foreach (var t in gameTasks) {
				taskList.Add(th.GetTask(t.TaskId));
			}
			List<TaskModel> allPlayerTasks = await pth.GetAllTaskForPlayerForGame(game.GameId, user);
			if (allPlayerTasks == new List<TaskModel>()) {
				foreach (var task in gameTasks) {
					await pth.CreatePlayerTaskAsync(task.TaskId, task.GameId, user);
				}
			} else {
				foreach (var task in taskList) {
					//CHECK IF ALREADY EXISTS
					//cannot have duplicates, but allows for it!
					if (!allPlayerTasks.Contains(task)) {
						await pth.CreatePlayerTaskAsync(task.TaskId, game.GameId, user);
					}
				}
			}
			return result;
		}

		[HttpGet]
		[Authorize]
		public async Task<bool> ParticipateGamePasswordAsync(int id, string password) {
			bool result = true;
			if (!gameHandler.IsPasswordCorrect(id, password)) {
				return false;
			}
			var context = HttpContext.User;
			var user = await userHandler.GetUserByEmail(HttpContext.User.Identity.Name);
			if (user == null) {
				throw new NullReferenceException("User not found");
			}
			if (gameHandler.GameExists(id) && !pgh.PlayerHasParticipated(id, user.Id)) {
				result = JsonConvert.SerializeObject(pgh.ParticipateGame(id, user.Id)) == "" ? false : true;
			} else {
				return false;
			}
			//START TOOL VM
			var bearer = await aapi.GetBearerTokenAsync();
			var toolsVmName = await aapi.CreateToolsVmAsync(bearer);

			//DELETE TOOL VM WHEN GAME TIME IS OUT
			var game = gameHandler.GetGame(id);
			var GameEndTime = game.EndDate;
			//Because job is required to be 15 minutes in the future
			await aapi.DeleteVmScheduleAsync(bearer, GameEndTime, toolsVmName);
			//ADD TOOL VM TO DB
			var vmEntity = await vmh.CreateVirtualMachineEntityAsync(toolsVmName, user);
			vmEntity.IsGame = true;
			vmEntity.GameId = id;
			vmh.UpdateVMEntity(vmEntity);
			//Update playerGame table
			var playerGame = pgh.GetPlayerGame(id, user.Id);
			playerGame.ToolVmIdentifier = toolsVmName;
			playerGame.ToolVmCreated = true;
			pgh.UpdateGame(playerGame);
			//CREATE PLAYERTASK FOR ALL TASKS IN GAME
			var gameTasks = gth.GetAllTasksForGame(id);
			List<TaskModel> taskList = new List<TaskModel>();
			foreach (var t in gameTasks) {
				taskList.Add(th.GetTask(t.TaskId));
			}
			List<TaskModel> allPlayerTasks = await pth.GetAllTaskForPlayerForGame(game.GameId, user);
			if (allPlayerTasks == new List<TaskModel>()) {
				foreach (var task in gameTasks) {
					await pth.CreatePlayerTaskAsync(task.TaskId, task.GameId, user);
				}
			} else {
				foreach (var task in taskList) {
					//CHECK IF ALREADY EXISTS
					//cannot have duplicates, but allows for it!
					if (!allPlayerTasks.Contains(task)) {
						await pth.CreatePlayerTaskAsync(task.TaskId, game.GameId, user);
					}
				}
			}
			return true;
		}

		[HttpGet]
		[Authorize]
		public async Task<List<PlayerGameModel>> GetParticipatedGames() {
			var user = await userHandler.GetUserByEmail(HttpContext.User.Identity.Name);
			var result = pgh.GetAllParticipatedGames(user.Id).ToList();
			return result;
		}

		[HttpGet]
		[Authorize]
		public async Task<Object> GetGameStateInfo(int gameId) {
			var user = await userHandler.GetUserByEmail(HttpContext.User.Identity.Name);
			var playerGame = pgh.GetPlayerGame(gameId, user.Id);
			var allTasks = await pth.GetAllPlayerTaskForPlayerForGame(gameId, user);
			int totalPoints = 0;
			int MaxPoints = 0;
			int totalTimeSpent = 0;
			int MaxTime = 0;
			//Calculate
			foreach (var tasks in allTasks) {
				totalPoints += tasks.PointsRecieved;
				totalTimeSpent += tasks.TimeSpent;
				MaxTime += tasks.Task.Duration;
				MaxPoints += tasks.Task.MaxPoints;
			}

			return new {
				state = playerGame.state,
				totalPoints = totalPoints,
				totalTimeSpent = totalTimeSpent,
				MaxPoints = MaxPoints,
				MaxTime = MaxTime,
			};
		}

		[HttpGet]
		[Authorize]
		public async Task<bool> HasParticipated(int gameId) {
			var context = HttpContext.User;
			var user = await userHandler.GetUserByEmail(HttpContext.User.Identity.Name);

			if (pgh.PlayerHasParticipated(gameId, user.Id))
				return true;
			return false;
		}

		//TODO: Add authorize admin
		[HttpGet]
		public async Task<bool> AddTaskToGame(int taskId, int gameId) {
			string page = HttpContext.Request.Query["taskId"].ToString();
			string page2 = HttpContext.Request.Query["gameId"].ToString();
			string page3 = HttpContext.Request.Query.ToString();
			if (!gth.GameHasTask(taskId, gameId)) {
				var x = gth.AddTaskToGame(taskId, gameId);
				if (x.GameTaskId != 0) {
					return true;
				}
			}
			return false;
		}

		//TODO: Add authorize admin
		[HttpGet]
		[Authorize]
		public async Task<List<TaskModel>> GetAllTasks() {
			return th.GetAllTasks();
		}

		[HttpGet]
		[Authorize]
		public List<TaskModel> GetAllTasksForGame(int gameId) {
			var GameTask = gth.GetAllTasksForGame(gameId);
			List<TaskModel> model = new List<TaskModel>();
			foreach (var t in GameTask) {
				var tasksInGame = th.GetTask(t.TaskId);
				model.Add(tasksInGame);
			}
			return model;
		}

		[HttpGet]
		[Authorize]
		public async Task<List<TaskModel>> GetAllTasksForGameForPlayerAsync(int gameId) {
			List<TaskModel> model = new List<TaskModel>();

			var context = HttpContext.User;
			var user = await userHandler.GetUserByEmail(HttpContext.User.Identity.Name);
			if (user == null) {
				throw new NullReferenceException("USER IS NULL, CANNOT GET TASK");
			}

			var result = await pth.GetAllTaskForPlayerForGame(gameId, user);
			return result;
		}

		[HttpGet]
		[Authorize]
		public async Task<bool> StartTaskForgame(int taskId, int gameId) {
			var context = HttpContext.User;
			var user = await userHandler.GetUserByEmail(HttpContext.User.Identity.Name);
			var game = gameHandler.GetGame(gameId);
			var task = th.GetTask(taskId);
			if (user == null || task == null || game == null) {
				throw new NullReferenceException("USER IS NULL, CANNOT GET TASK");
			}
			if (task.TemplateName == null || string.IsNullOrWhiteSpace(task.TemplateName) || task.TemplateName.ToLower() == "null") {
				var r = pth.StartTaskForPlayerForGame(game, task, user);
				var playerTasks = await pth.GetPlayerTaskAsync(game, task, user);
				playerTasks.VmName = "null";
				playerTasks.VmIsRunning = true;
				pth.UpdatePlayerTask(playerTasks);
				return r;
			}
			var bearer = await aapi.GetBearerTokenAsync();
			//CREATE TASK VM
			string VmTemplateName = task.TemplateName.ToString();
			var templateUri = $"https://cyberrangestorage.blob.core.windows.net/templates/{VmTemplateName}";
			var taskVmName = await aapi.CreateTaskVmAsync(bearer, templateUri);
			//Create Task Virtual Machine
			var vmEntity = await vmh.CreateVirtualMachineEntityAsync(taskVmName, user);
			vmEntity.IsGame = false;
			vmEntity.GameId = gameId;
			vmEntity.TaskId = taskId;
			vmh.UpdateVMEntity(vmEntity);
			//Add taskVM to PlayerTask
			var playerTask = await pth.GetPlayerTaskAsync(game, task, user);
			playerTask.VmName = taskVmName;
			playerTask.VmIsRunning = true;
			pth.UpdatePlayerTask(playerTask);
			//Delete Vm when time runs out
			var TaskEndTime = DateTime.Now.AddMinutes(task.Duration);
			//Because job is required to be 15 minutes in the future
			if (task.Duration <= 15) {
				TaskEndTime = DateTime.Now;
			}
			await aapi.DeleteVmScheduleAsync(bearer, TaskEndTime, taskVmName);
			bool result = false;
			//If VM is null
			try {
				result = pth.StartTaskForPlayerForGame(game, task, user);
				return result;
			} catch (Exception e) {
				return false;
			}
		}

		[HttpGet]
		[Authorize]
		public async Task<bool> DeliverFlag(int taskId, int gameId, string flag) {
			var context = HttpContext.User;
			var user = await userHandler.GetUserByEmail(HttpContext.User.Identity.Name);
			var game = gameHandler.GetGame(gameId);
			var task = th.GetTask(taskId);
			if (user == null || task == null || game == null) {
				throw new NullReferenceException("USER IS NULL, CANNOT GET TASK");
			}
			bool isFlagCorrect = await pth.DeliverFlagAsync(game, task, user, flag);
			if (isFlagCorrect) {
				//Delete Virtual machine
				var bearer = await aapi.GetBearerTokenAsync();
				PlayerTaskModel playerTask = await pth.GetPlayerTaskAsync(game, task, user);
				await aapi.DeleteVmAndAllResources(bearer, playerTask.VmName);

				//Check if all tasks are completed
				var allGameTasks = await pth.GetAllTaskForPlayerForGame(game.GameId, user);
				if (allGameTasks.All(x => x.State == "finished")) {
					//Delete tool vm
					var playerGame = pgh.GetPlayerGame(game.GameId, user.Id);
					var tollVmName = playerGame.ToolVmIdentifier;
					await aapi.DeleteVmAndAllResources(bearer, tollVmName);
					//update PlayerGame state
					playerGame.state = "finished";
					pgh.UpdateGame(playerGame);
				}
			}
			return isFlagCorrect;
		}

		[HttpGet]
		[Authorize]
		public async Task<GameInfo> GetGeneralGameInfoAsync(int gameId) {
			GameModel gameModel = gameHandler.GetGame(gameId);
			var participants = pgh.GetParticipantsForGame(gameId);
			var user = await userHandler.GetUserByEmail(HttpContext.User.Identity.Name);
			var participant = pgh.PlayerHasParticipated(gameId, user.Id);
			GameInfo model = new GameInfo() {
				game = gameModel,
				participants = participants,
				AmountOfTasks = gth.GetAllTasksForGame(gameId).Count(),
				participant = participant
			};
			return model;
		}

		[HttpGet]
		[Authorize]
		public async Task<Object> GetGameStatsInfoForGame(int gameId) {
			var user = await userHandler.GetUserByEmail(HttpContext.User.Identity.Name);
			var playerGameParticipants = pgh.GetUsersParticipantsForGame(gameId);
			//GET ALL PLAYERS FOR GAME
			List<Stats> StatsList = new List<Stats>();
			foreach (var p in playerGameParticipants) {
				var player = userHandler.GetUserById(p.PlayerId);
				var playerGame = pgh.GetPlayerGame(gameId, player.Id);

				var allTasks = await pth.GetAllPlayerTaskForPlayerForGame(gameId, player);
				int totalPoints = 0;
				int MaxPoints = 0;
				int totalTimeSpent = 0;
				int MaxTime = 0;
				//Calculate
				foreach (var tasks in allTasks) {
					totalPoints += tasks.PointsRecieved;
					totalTimeSpent += tasks.TimeSpent;
					MaxTime += tasks.Task.Duration;
					MaxPoints += tasks.Task.MaxPoints;
				}
				//Remove player info
				player.PasswordHash = "";
				player.FirstName = "";
				player.LastName = "";
				player.PhoneNumber = "";
				player.Email = "";
				player.Id = "";
				player.TwoFactorEnabled = true;

				//Collect stats
				var stats = new Stats() {
					User = player,
					TotalPoints = totalPoints,
					TotalTimeSpent = totalTimeSpent,
					MaxPoints = MaxPoints,
					MaxTime = MaxTime,
					GameState = playerGame.state,
				};
				StatsList.Add(stats);
			}

			return StatsList.OrderByDescending(x => x.TotalPoints);
		}

		public class Stats
		{
			public CyberSparrow User { get; set; }
			public int TotalPoints { get; set; }
			public int TotalTimeSpent { get; set; }
			public int MaxPoints { get; set; }
			public int MaxTime { get; set; }
			public string GameState { get; set; }
		}

		[HttpGet]
		[Authorize(Roles = "Admin")]
		public async Task<bool> DeleteGameAsync(int gameId) {
			//Delete all player game
			var pghGames = pgh.GetAllGames(gameId);
			foreach (var game in pghGames) {
				var bearer = await aapi.GetBearerTokenAsync();
				await aapi.DeleteVmAndAllResources(bearer, game.ToolVmIdentifier);
			}
			pgh.DeleteGame(gameId);
			//Delete game
			gameHandler.DeleteGame(gameId);
			//delete all gametasks
			gth.DeleteGame(gameId);
			//deolete alle player game task
			pth.DeleteGame(gameId);

			return true;
		}

		[HttpGet]
		[Authorize(Roles = "Admin")]
		public bool RemoveTaskFromGame(int gameId, int taskId) {
			return gth.RemoveTaskFromGame(taskId, gameId);
		}

		[HttpGet]
		[Authorize]
		public async Task<bool> FinishGameAsync(int gameId) {
			var user = await userHandler.GetUserByEmail(HttpContext.User.Identity.Name);
			var playerGame = pgh.GetPlayerGame(gameId, user.Id);
			var bearer = await aapi.GetBearerTokenAsync();
			//delete tool vm
			await aapi.DeleteVmAndAllResources(bearer, playerGame.ToolVmIdentifier);
			playerGame.state = "finished";
			//Finish all tasks
			var allPlayerGameTasks = await pth.GetAllPlayerTaskForPlayerForGame(gameId, user);
			foreach (var task in allPlayerGameTasks) {
				if (task.TaskState.ToLower() != "finished") {
					task.PointsRecieved = 0;
					task.TaskState = "finished";
					if (task.VmName != null || string.IsNullOrWhiteSpace(task.VmName)) {
						await aapi.DeleteVmAndAllResources(bearer, task.VmName);
						task.VmIsRunning = false;
					}
					pth.UpdatePlayerTask(task);
				}
			}
			var result = pgh.UpdateGame(playerGame);
			return result;
		}

		[HttpGet]
		[Authorize(Roles = "Admin")]
		public bool UpdateGameVisibility(int gameId, bool hidden) {
			var game = gameHandler.GetGame(gameId);
			return gameHandler.UpdateGameVisibility(game, hidden);
		}

		public class GameInfo
		{
			public GameModel game { get; set; }
			public int participants { get; set; }
			public int AmountOfTasks { get; set; }
			public bool participant { get; set; }
		}
	}
}