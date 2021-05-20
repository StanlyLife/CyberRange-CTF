using CyberRangeProject.Models.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static CyberRangeProject.Controllers.UserController;

namespace CyberRangeProject.Data.Retriever
{
	public class UserHandler : IUserHandler
	{
		private readonly CyberSparrowContext db;

		public UserHandler(CyberSparrowContext db, UserManager<CyberSparrow> userManager) {
			this.db = db;
			UserManager = userManager;
		}

		public UserManager<CyberSparrow> UserManager { get; }

		public async Task<List<CyberSparrow>> GetAllUsersAsync() {
			return await UserManager.Users.ToListAsync();
		}

		public async Task<bool> UpdateProfilePictureAsync(CyberSparrow user, string profilePictureUrl) {
			var u = await db.Users.FirstAsync(x => x.Id == user.Id);
			u.ProfilePictureUrl = profilePictureUrl;
			db.Users.Update(u);
			return SaveChanges();
		}

		public async Task<bool> UpdateProfileBannerPictureAsync(CyberSparrow user, string UpdateProfileBanner) {
			var u = await db.Users.FirstAsync(x => x.Id == user.Id);
			u.BannerPictureUrl = UpdateProfileBanner;
			db.Users.Update(u);
			return SaveChanges();
		}

		public bool UpdateProfile(CyberSparrow user, UpdateProfileModel model) {
			user.Biography = model.Biography;
			user.PhoneNumber = model.PhoneNumber;
			db.Users.Update(user);
			return SaveChanges();
		}

		public bool UpdateProfile(CyberSparrow user) {
			db.Users.Update(user);
			return SaveChanges();
		}

		public int GetLevel(CyberSparrow user) {
			var level = CalculateLevel(user.TotalPoints, user.Level);
			if (level > user.Level) {
				user.Level = level;
				UpdateUser(user);
			}
			return level;
		}

		//Returns totalPoints
		public int AddPoints(CyberSparrow user, int points) {
			user.TotalPoints += points;
			UpdateUser(user);
			return user.TotalPoints;
		}

		public bool UpdateUser(CyberSparrow user) {
			db.Users.Update(user);
			return SaveChanges();
		}

		public bool SaveChanges() {
			return db.SaveChanges() > 0;
		}

		public async Task<CyberSparrow> GetUserByEmail(string email) {
			var user = await UserManager.Users.FirstOrDefaultAsync(x => x.Email == email);
			var level = GetLevel(user);
			if (user.Level < level) {
				user = await UserManager.Users.FirstOrDefaultAsync(x => x.Email == email);
			}
			return user;
		}

		public CyberSparrow GetUserById(string userId) {
			return db.Users.FirstOrDefault(x => x.Id == userId);
		}

		private int CalculateLevel(int points, int level) {
			var NextLevel = points / (((Math.Pow(level, 2)) * 10) + (level * 10));
			if (NextLevel >= 1) {
				level++;
				CalculateLevel(points, level);
			}
			return (int)Math.Floor(NextLevel);
		}
	}
}