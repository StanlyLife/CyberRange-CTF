using System;
using System.Collections.Generic;
using System.Linq;
using System.Management.Automation;
using System.Threading.Tasks;

namespace CyberRangeProject.Powershell {

	public class RunScript {
		/// <summary>
		/// Runs a PowerShell script with parameters and prints the resulting pipeline objects to the console output.
		/// </summary>

		public async Task Run(string scriptContents, Dictionary<string, object> scriptParameters) {
			// create a new hosted PowerShell instance using the default runspace.
			// wrap in a using statement to ensure resources are cleaned up.

			using (PowerShell ps = PowerShell.Create()) {
				// specify the script code to run.
				ps.AddScript(scriptContents);

				// specify the parameters to pass into the script.
				ps.AddParameters(scriptParameters);

				// execute the script and await the result.
				var pipelineObjects = await ps.InvokeAsync().ConfigureAwait(false);

				// print the resulting pipeline objects to the console.
				foreach (var item in pipelineObjects) {
					if (item != null)
						Console.WriteLine(item.BaseObject.ToString());
				}
			}
		}
	}
}