using CyberRangeProject.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static CyberRangeProject.Controllers.UserController;

namespace CyberRangeProject.Data.Retriever
{
	public interface IUserHandler
	{
		public Task<List<CyberSparrow>> GetAllUsersAsync();

		public Task<CyberSparrow> GetUserByEmail(string email);

		public Task<bool> UpdateProfilePictureAsync(CyberSparrow user, string profilePictureUrl);

		public Task<bool> UpdateProfileBannerPictureAsync(CyberSparrow user, string profilePictureUrl);

		public bool UpdateProfile(CyberSparrow user, UpdateProfileModel model);

		public bool UpdateProfile(CyberSparrow user);

		public int AddPoints(CyberSparrow user, int points);

		public CyberSparrow GetUserById(string userId);

		public bool UpdateUser(CyberSparrow user);

		public int GetLevel(CyberSparrow user);
	}
}