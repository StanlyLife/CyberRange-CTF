using CyberRangeProject.Models.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CyberRangeProject.Models
{
	public class RegistrationCodesModel
	{
		[Key]
		public string CodeId { get; set; }

		public bool Active { get; set; }
		public int MaxUses { get; set; }
		public int CurrentUses { get; set; }
	}
}