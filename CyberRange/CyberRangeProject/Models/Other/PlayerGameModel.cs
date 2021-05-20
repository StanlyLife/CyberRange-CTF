using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CyberRangeProject.Models.Other {

	public class PlayerGameModel {

		[Key]
		public int PlayerGameId { get; set; }

		public int GameId { get; set; }

		public string PlayerId { get; set; }

		public string state { get; set; }
		public string ToolVmIdentifier { get; set; }
		public string ToolVmIp { get; set; }
		public bool ToolVmCreated { get; set; }
	}
}