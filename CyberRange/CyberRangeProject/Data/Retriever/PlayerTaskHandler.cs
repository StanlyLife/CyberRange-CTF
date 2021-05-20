using CyberRangeProject.Models.Game;
using CyberRangeProject.Models.Other;
using CyberRangeProject.Models.Task;
using CyberRangeProject.Models.Users;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CyberRangeProject.Data.Retriever
{
	public class PlayerTaskHandler
	{
		private readonly CyberSparrowContext db;
		private readonly TaskHandler th;
		private readonly GameHandler gh;
		private readonly IUserHandler userhandler;

		public PlayerTaskHandler(
			CyberSparrowContext db,
			TaskHandler th,
			GameHandler gh,
			IUserHandler userhandler
			) {
			this.db = db;
			this.th = th;
			this.gh = gh;
			this.userhandler = userhandler;
		}

		public async Task<PlayerTaskModel> CreatePlayerTaskAsync(int taskId, int gameId, CyberSparrow user) {
			var task = th.GetTask(taskId);
			var game = gh.GetGame(gameId);
			if (task == null || game == null)
				throw new NullReferenceException("GAME OR TASK IS NULL");
			PlayerTaskModel model = new PlayerTaskModel();
			model.Game = game;
			model.Task = task;
			model.User = user;
			model.NumberOfFailedflags = 0;
			model.TaskState = "ready";
			var m = await db.PlayerTask.AddAsync(model);
			db.SaveChanges();
			return m.Entity;
		}

		public async Task<List<TaskModel>> GetAllTaskForPlayerForGame(int gameId, CyberSparrow user) {
			var game = gh.GetGame(gameId);
			var playerTaskList = await db.PlayerTask.Include(x => x.Task).Where(x => x.Game == game && x.User == user && x.TaskState != "null").ToListAsync();
			List<TaskModel> model = new List<TaskModel>();
			if (playerTaskList.Count() > 0) {
				foreach (var t in playerTaskList) {
					if (t.Task != null) {
						var taskModel = await db.Task.FirstAsync(x => x.TaskId == t.Task.TaskId);
						TaskModel task = new TaskModel();
						task = taskModel;
						var state = t.TaskState;
						task.State = state;
						model.Add(task);
					} else {
						Console.WriteLine("TASK IS NULL");
					}
				}
			} else {
				return new List<TaskModel>();
			}
			return model;
		}

		public async Task<List<PlayerTaskModel>> GetAllPlayerTaskForPlayerForGame(int gameId, CyberSparrow user) {
			var game = gh.GetGame(gameId);
			var playerTaskList = await db.PlayerTask.Include(x => x.Task).Where(x => x.Game.GameId == gameId && x.User.Id == user.Id).ToListAsync();
			return playerTaskList;
		}

		public bool DeleteGame(int gameId) {
			var games = db.PlayerTask.Where(x => x.Game.GameId == gameId).ToList();
			foreach (var game in games) {
				db.PlayerTask.Remove(game);
			}
			return SaveChanges();
		}

		public bool StartTaskForPlayerForGame(GameModel game, TaskModel task, CyberSparrow user) {
			var pt = db.PlayerTask.FirstOrDefault(x => x.Game == game && x.Task == task && x.User == user);
			if (pt == null) {
				throw new NullReferenceException("DID NOT FIND ANY TASKS FOR GAME OR USER");
				return false;
			}
			pt.Started = DateTime.Now;
			pt.TaskState = "started";
			db.Update(pt);
			var x = SaveChanges();
			//TODO CALCULATE TIME AND CLOSE VM AND TASK AFTER TIME!!!!
			return x;
		}

		public async Task<PlayerTaskModel> GetPlayerTaskAsync(GameModel game, TaskModel task, CyberSparrow user) {
			return await db.PlayerTask.FirstOrDefaultAsync(x => x.Game.GameId == game.GameId && x.Task.TaskId == task.TaskId && x.User.Id == user.Id);
		}

		public async Task<bool> DeliverFlagAsync(GameModel game, TaskModel task, CyberSparrow user, string flag) {
			var playerTask = db.PlayerTask.FirstOrDefault(x => x.Game == game && x.Task == task && x.User == user);
			if (playerTask == null) {
				throw new NullReferenceException("PLAYER TASK NOT FOUND");
				return false;
			}
			//Edgecase if function is called twice
			if (playerTask.TaskState == "finished") {
				return true;
			}
			if (playerTask.Task.Flag.ToLower() == flag.ToLower() || playerTask.Task.Flag.ToLower() == "kcsc{" + flag.ToLower() + "}") {
				playerTask.TaskState = "finished";
				TimeSpan ts = (DateTime.Now - playerTask.Started);
				playerTask.TimeSpent = ts.Minutes;
				//CalculatePoints
				var score = CalculateTaskScore(task.Duration, playerTask.TimeSpent, task.MaxPoints, playerTask.NumberOfFailedflags);
				playerTask.PointsRecieved = score;
				userhandler.AddPoints(user, score);
				//
				db.PlayerTask.Update(playerTask);
				SaveChanges();
				return true;
			} else {
				playerTask.NumberOfFailedflags = playerTask.NumberOfFailedflags + 1;
				db.PlayerTask.Update(playerTask);
				SaveChanges();
				if (playerTask.NumberOfFailedflags >= 5) {
					await SetTaskFinishedAsync(playerTask.Task.TaskId, playerTask.Game.GameId, user);
				}
			}
			return false;
		}

		public async Task<bool> SetTaskFinishedAsync(int taskid, int gameid, CyberSparrow user) {
			var game = gh.GetGame(gameid);
			var task = th.GetTask(taskid);
			var playerTask = await GetPlayerTaskAsync(game, task, user);
			if (playerTask == null)
				return false;
			TimeSpan ts = (DateTime.Now - playerTask.Started);
			playerTask.TimeSpent = ts.Minutes;
			playerTask.TaskState = "finished";

			return UpdatePlayerTask(playerTask);
		}

		public bool UpdatePlayerTask(PlayerTaskModel model) {
			db.PlayerTask.Update(model);
			return SaveChanges();
		}

		public async Task<bool> DeletePlayerTaskAsync(TaskModel task) {
			var tasks = await db.PlayerTask.Where(x => x.Task.TaskId == task.TaskId).ToListAsync();
			foreach (var t in tasks) {
				db.PlayerTask.Remove(t);
			}
			return SaveChanges();
		}

		public bool SaveChanges() {
			return db.SaveChanges() > 0;
		}

		private int CalculateTaskScore(int duration, int timespent, int maxPoints, int numberOfFailedFlags) {
			double score;
			if (timespent > duration) {
				return 0;
			} else if (numberOfFailedFlags > 4) {
				return 0;
			} else if (numberOfFailedFlags > 0 && numberOfFailedFlags < 5) {
				score = maxPoints - (maxPoints * ((double)timespent / duration)) - (maxPoints / 5 * numberOfFailedFlags);
				if (score < 1) {
					return 1;
				} else {
					return (int)Math.Floor(score);
				}
			} else {
				score = maxPoints - (maxPoints * ((double)timespent / duration));
				if (score < 1) {
					return 1;
				}
			}
			return (int)Math.Floor(score);
		}
	}
}