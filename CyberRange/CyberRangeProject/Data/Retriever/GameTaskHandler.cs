using CyberRangeProject.Models.Other;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CyberRangeProject.Data.Retriever
{
	public class GameTaskHandler
	{
		private readonly CyberSparrowContext db;

		public GameTaskHandler(CyberSparrowContext db) {
			this.db = db;
		}

		public GameTaskModel AddTaskToGame(int taskId, int gameId) {
			GameTaskModel model = new GameTaskModel();
			model.GameId = gameId;
			model.TaskId = taskId;
			model.TaskState = "ready";
			var x = db.GameTask.Add(model);
			SaveChanges();
			return x.Entity;
		}

		public bool RemoveTaskFromGame(int taskId, int gameId) {
			var x = db.GameTask.FirstOrDefault(x => x.GameId == gameId && x.TaskId == taskId);
			if (x == null) {
				Console.WriteLine("Did not find GameTask to remove");
				throw new Exception("Game not found");
			}
			var result = db.GameTask.Remove(x);
			var save = SaveChanges();
			return save;
		}

		public bool GameHasTask(int taskId, int gameId) {
			return db.GameTask.Any(x => x.GameId == gameId && x.TaskId == taskId);
		}

		public List<GameTaskModel> GetAllTasksForGame(int gameId) {
			return db.GameTask.Where(x => x.GameId == gameId).ToList();
		}

		public List<GameTaskModel> GetAllGamesFromTask(int taskId) {
			return db.GameTask.Where(x => x.TaskId == taskId).ToList();
		}

		public bool DeleteGameTasks(int taskId) {
			var gametasks = db.GameTask.Where(x => x.TaskId == taskId);
			foreach (var gt in gametasks) {
				db.GameTask.Remove(gt);
			}
			return SaveChanges();
		}

		public bool DeleteGame(int gameId) {
			var games = db.GameTask.Where(x => x.GameId == gameId).ToList();
			foreach (var game in games) {
				db.GameTask.Remove(game);
			}
			return SaveChanges();
		}

		public bool SaveChanges() {
			return db.SaveChanges() > 0;
		}
	}
}