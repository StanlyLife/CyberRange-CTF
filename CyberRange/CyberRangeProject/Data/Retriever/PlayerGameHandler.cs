using CyberRangeProject.Models.Other;
using CyberRangeProject.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CyberRangeProject.Data.Retriever
{
	public class PlayerGameHandler
	{
		private readonly CyberSparrowContext db;

		public PlayerGameHandler(CyberSparrowContext db) {
			this.db = db;
		}

		public PlayerGameModel ParticipateGame(int gameId, string userId) {
			PlayerGameModel model = new PlayerGameModel();
			model.GameId = gameId;
			model.PlayerId = userId;
			model.state = "undefined";
			model.ToolVmCreated = false;
			var x = db.PlayerGame.Add(model);
			db.SaveChanges();
			return x.Entity;
		}

		public List<PlayerGameModel> GetAllGames(int gameid) {
			return db.PlayerGame.Where(x => x.GameId == gameid).ToList();
		}

		public bool DeleteGame(int gameId) {
			var pg = db.PlayerGame.Where(x => x.GameId == gameId).ToList();
			foreach (var game in pg) {
				db.PlayerGame.Remove(game);
			}
			return SaveChanges();
		}

		public List<PlayerGameModel> GetAllParticipatedGames(string playerId) {
			return db.PlayerGame.Where(x => x.PlayerId == playerId).ToList();
		}

		public bool PlayerHasParticipated(int id, string playerId) {
			return db.PlayerGame.Any(x => x.GameId == id && x.PlayerId == playerId);
		}

		public PlayerGameModel GetPlayerGame(int playerGameId) {
			var result = db.PlayerGame.First(x => x.PlayerGameId == playerGameId);
			return result;
		}

		public PlayerGameModel GetPlayerGame(int gameId, string userId) {
			var result = db.PlayerGame.First(x => x.GameId == gameId && x.PlayerId == userId);
			return result;
		}

		public int GetParticipantsForGame(int id) {
			return db.PlayerGame.Where(x => x.GameId == id).ToList().Count();
		}

		public List<PlayerGameModel> GetUsersParticipantsForGame(int id) {
			return db.PlayerGame.Where(x => x.GameId == id).ToList();
		}

		public bool UpdateGame(PlayerGameModel model) {
			db.PlayerGame.Update(model);
			return SaveChanges();
		}

		public bool SaveChanges() {
			return db.SaveChanges() > 0;
		}
	}
}