using CyberRangeProject.Models.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CyberRangeProject.Models.Other {

	public class VirtualMachineModel {

		[key]
		[Column(Order = 1)]
		public string Id { get; set; }

		[Column(Order = 2)]
		[ForeignKey("UserId")]
		public CyberSparrow user { get; set; }

		[Column(Order = 3)]
		public string IpAdress { get; set; }

		[Column(Order = 4)]
		public string state { get; set; }

		[Column(Order = 5)]
		public DateTime CloseTime { get; set; }

		[Column(Order = 6)]
		public DateTime Started { get; set; }

		[Column(Order = 7)]
		public string Username { get; set; }

		[Column(Order = 8)]
		public string Password { get; set; }

		[Column(Order = 9)]
		public string SSHKey { get; set; }

		public bool IsGame { get; set; }
		public int TaskId { get; set; }
		public int GameId { get; set; }
	}
}