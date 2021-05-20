using CyberRangeProject.Models.Other;
using CyberRangeProject.Models.Users;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CyberRangeProject.Data.Retriever
{
	public class VirtualMachineHandler
	{
		private readonly CyberSparrowContext db;

		public VirtualMachineHandler(
			CyberSparrowContext db
			) {
			this.db = db;
		}

		public async Task<VirtualMachineModel> CreateVirtualMachineEntityAsync(string id, CyberSparrow user) {
			VirtualMachineModel model = new VirtualMachineModel();
			model.state = "deploying";
			model.Id = id;
			model.Started = DateTime.Now;
			model.user = user;
			var result = await db.AddAsync(model);
			SaveChanges();
			return result.Entity;
		}

		public bool UpdateVMEntity(VirtualMachineModel model) {
			db.VirtualMachines.Update(model);
			return SaveChanges();
		}

		public string FindOrigin(string vmName) {
			var result = Newtonsoft.Json.JsonConvert.SerializeObject(db.PlayerGame.Where(x => x.ToolVmIdentifier == vmName));
			if (result.Length < 3)
				result = Newtonsoft.Json.JsonConvert.SerializeObject(db.PlayerTask.Include(x => x.User).Where(x => x.VmName == vmName));
			if (result == null || string.IsNullOrWhiteSpace(result) || result == "[]") {
				result = "unknown";
			}
			return result;
		}

		public bool SaveChanges() {
			return db.SaveChanges() > 0;
		}
	}
}