using CyberRangeProject.Models.Game;
using CyberRangeProject.Models.Task;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CyberRangeProject.Models.Other {

	public class GameTaskModel {

		[Key]
		public int GameTaskId { get; set; }
		public int GameId { get; set; }

		public int TaskId { get; set; }

		public string TaskState { get; set; }
	}
}