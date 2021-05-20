using CyberRangeProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CyberRangeProject.Data.Retriever
{
	public class RegistrationCodesHandler
	{
		private readonly CyberSparrowContext db;

		public RegistrationCodesHandler(CyberSparrowContext db) {
			this.db = db;
		}

		public bool AddRegistrationCode(RegistrationCodesModel model) {
			model.CurrentUses = 0;
			db.RegistrationCodes.Add(model);
			return SaveChanges();
		}

		public bool UpdateRegistrationCode(RegistrationCodesModel model) {
			db.RegistrationCodes.Update(model);
			return SaveChanges();
		}

		public bool DeleteCode(string code) {
			var codeModel = db.RegistrationCodes.First(x => x.CodeId == code);
			db.RegistrationCodes.Remove(codeModel);
			return SaveChanges();
		}

		public bool UseRegistrationCode(string codeId) {
			var code = GetRegistartionCode(codeId);
			code.CurrentUses += 1;
			UpdateRegistrationCode(code);
			SaveChanges();
			return true;
		}

		public bool IsCodeValid(string codeId) {
			var code = GetRegistartionCode(codeId);
			if (code != null && code.CurrentUses < code.MaxUses && code.Active) {
				return true;
			}
			return false;
		}

		public List<RegistrationCodesModel> GetAllCodes() {
			return db.RegistrationCodes.Where(x => x.CodeId != null).ToList();
		}

		public RegistrationCodesModel GetRegistartionCode(string CodeId) {
			return db.RegistrationCodes.FirstOrDefault(x => x.CodeId == CodeId);
		}

		public bool SaveChanges() {
			return db.SaveChanges() > 0;
		}
	}
}