using CyberRangeProject.Models.Game;
using CyberRangeProject.Models.Task;
using CyberRangeProject.Models.Users;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CyberRangeProject.Models.Other
{
	public class PlayerTaskModel
	{
		[Key]
		public int PlayerTaskId { get; set; }

		[ForeignKey("GameId")]
		[Required]
		public GameModel Game { get; set; }

		[ForeignKey("TaskId")]
		[Required]
		public TaskModel Task { get; set; }

		[ForeignKey("Id")]
		[Required]
		public CyberSparrow User { get; set; }

		public string TaskState { get; set; }

		//In minutes
		public int TimeSpent { get; set; }

		public int PointsRecieved { get; set; }
		public int NumberOfFailedflags { get; set; }

		public DateTime Started { get; set; }
		public string VmName { get; set; }
		public bool VmIsRunning { get; set; }
	}
}