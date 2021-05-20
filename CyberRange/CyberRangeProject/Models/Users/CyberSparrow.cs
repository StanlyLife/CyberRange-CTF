using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CyberRangeProject.Models.Users
{
	public class CyberSparrow : IdentityUser
	{
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string ProfilePictureUrl { get; set; }
		public string BannerPictureUrl { get; set; }
		public string Biography { get; set; }
		public string RegistrationCodeUsed { get; set; }
		public int Level { get; set; }
		public int TotalPoints { get; set; }
		public bool IsUserActive { get; set; }
	}
}