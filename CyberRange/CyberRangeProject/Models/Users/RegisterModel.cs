using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CyberRangeProject.Models.Users {

	public class RegisterModel {
		public string Email { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string UserName { get; set; }
		public string Password { get; set; }
		public string ConfirmPassword { get; set; }
		public string Token { get; set; }
		public string RegistrationCodeUsed { get; set; }
	}
}