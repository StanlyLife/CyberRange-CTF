using CyberRangeProject.Models.Task;
using System.Collections.Generic;
using System.Linq;

namespace CyberRangeProject.Data.Retriever {

	public class TaskHandler {
		private readonly CyberSparrowContext db;

		public TaskHandler(CyberSparrowContext db) {
			this.db = db;
		}

		public TaskModel CreateTask(TaskModel model) {
			var x = db.Task.Add(model);
			db.SaveChanges();
			return x.Entity;
		}

		public bool DeleteTask(TaskModel task) {
			db.Task.Remove(task);
			return SaveChanges();
		}

		public List<TaskModel> GetAllTasks() {
			return db.Task.Where(x => x.TaskId != null).ToList();
		}

		public bool TaskExists(int id) {
			return db.Task.Any(x => x.TaskId == id);
		}

		public TaskModel GetTask(int id) {
			var result = db.Task.First(x => x.TaskId == id);
			return result;
		}


		public bool UpdateGame(TaskModel model) {
			//var game = GetGame(model.GameId);
			//game = model;
			db.Task.Update(model);
			return SaveChanges();
		}

		public bool SaveChanges() {
			return db.SaveChanges() > 0;
		}
	}
}