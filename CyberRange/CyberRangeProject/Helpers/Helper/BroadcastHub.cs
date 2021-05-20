using CyberRangeProject.Helpers.Interface;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CyberRangeProject.Helpers.Helper {

	public class BroadcastHub : Hub<IHubClient> {
	}
}