using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CyberRangeProject.Models.Game
{
	public class GameModel
	{
		[Key]
		public int GameId { get; set; }

		public string Name { get; set; }
		public string Description { get; set; }
		public string Icon { get; set; }
		public bool IsTeamGame { get; set; }
		public bool IsPlayerGame { get; set; }
		public bool AlwaysOpen { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime EndDate { get; set; }
		public string State { get; set; }
		public string Category { get; set; }
		public bool Hidden { get; set; }
		public string Password { get; set; }
		public bool PasswordRequired { get; set; }
		public string VmTemplate { get; set; }
	}
}