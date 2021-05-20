using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CyberRangeProject.Models.Task {

	public class TaskModel {

		[Key]
		public int TaskId { get; set; }

		public string Icon { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public int Duration { get; set; }
		public string State { get; set; }
		public int MaxPoints { get; set; }
		public bool RandomFlag { get; set; }
		public string Flag { get; set; }
		public string TemplateName { get; set; }
	}
}