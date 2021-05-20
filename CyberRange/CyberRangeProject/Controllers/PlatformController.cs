using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CyberRangeProject.Controllers
{
	[ApiController]
	[Route("api/[controller]/[action]")]
	public class PlatformController : Controller
	{
		[HttpGet]
		public bool IsBackendUp() {
			return true;
		}
	}
}