using CyberRangeProject.Models.Game;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CyberRangeProject.Data.Retriever
{
	public class GameHandler
	{
		private readonly CyberSparrowContext db;

		public GameHandler(CyberSparrowContext db) {
			this.db = db;
		}

		public GameModel CreateGame(GameModel model) {
			model.Hidden = false;
			var x = db.Game.Add(model);
			db.SaveChanges();
			return x.Entity;
		}

		public bool DeleteGame(int gameId) {
			var game = db.Game.FirstOrDefault(x => x.GameId == gameId);
			db.Game.Remove(game);
			return SaveChanges();
		}

		public bool IsPasswordCorrect(int gameId, string password) {
			var game = db.Game.FirstOrDefault(x => x.GameId == gameId);
			//ignores case
			return game.Password.ToLower() == password.ToLower();
		}

		public List<GameModel> GetAllGames() {
			return db.Game.Where(x => x.GameId != null).ToList();
		}

		public bool GameExists(int id) {
			return db.Game.Any(x => x.GameId == id);
		}

		public bool UpdateGameVisibility(GameModel game, bool hidden) {
			game.Hidden = hidden;
			return UpdateGame(game);
		}

		public GameModel GetGame(int id) {
			var result = db.Game.FirstOrDefault(x => x.GameId == id);
			if (result == null)
				throw new NullReferenceException("GAME WITH ID " + id + " NOT FOUND ");
			return result;
		}

		public bool UpdateGame(GameModel model) {
			//var game = GetGame(model.GameId);
			//game = model;
			db.Game.Update(model);
			return SaveChanges();
		}

		public bool SaveChanges() {
			return db.SaveChanges() > 0;
		}
	}
}