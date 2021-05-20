using CyberRangeProject.Models;
using CyberRangeProject.Models.Game;
using CyberRangeProject.Models.Other;
using CyberRangeProject.Models.Roles;
using CyberRangeProject.Models.Task;
using CyberRangeProject.Models.Users;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CyberRangeProject.Data
{
	public class CyberSparrowContext : IdentityDbContext<CyberSparrow>
	{
		public CyberSparrowContext(DbContextOptions<CyberSparrowContext> options)
			: base(options) {
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder) {
			base.OnModelCreating(modelBuilder);

			modelBuilder.ApplyConfiguration(new RoleConfiguration());
		}

		//public DbSet<AppUser> CyberSparrow { get; set; }

		public DbSet<GameModel> Game { get; set; }

		public DbSet<TaskModel> Task { get; set; }
		public DbSet<GameTaskModel> GameTask { get; set; }
		public DbSet<PlayerTaskModel> PlayerTask { get; set; }
		public DbSet<PlayerGameModel> PlayerGame { get; set; }
		public DbSet<VirtualMachineModel> VirtualMachines { get; set; }
		public DbSet<RegistrationCodesModel> RegistrationCodes { get; set; }
	}
}