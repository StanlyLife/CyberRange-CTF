using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CyberRangeProject.Models.Users {

	public class LoginResponseModel {
		public bool IsAuthSuccessful { get; set; }
		public string ErrorMessage { get; set; }
		public string Token { get; set; }
	}
}