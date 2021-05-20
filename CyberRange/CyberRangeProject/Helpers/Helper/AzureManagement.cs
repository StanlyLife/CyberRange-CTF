using Microsoft.Azure.Management.Compute.Fluent;
using Microsoft.Azure.Management.Compute.Fluent.Models;
using Microsoft.Azure.Management.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent.Authentication;
using Microsoft.Azure.Management.ResourceManager.Models;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Microsoft.Rest;
using System;
using System.Threading.Tasks;
using Microsoft.Azure;

using Microsoft.IdentityModel.Clients.ActiveDirectory;

using Microsoft.Azure.Management.ResourceManager;

using Microsoft.Azure.Management.ResourceManager.Models;
using Microsoft.Rest;

namespace CyberRangeProject.Helpers.Helper {

	public class AzureManagement {
		private IAzure azure;

		public void Login() {
			string client = "9ab5958d-4850-4f61-9f33-f95692b6d33b";
			string secret = ".75_UTS.Hi_BKZHcWntL-3L~kr7txEV-V~";
			//string tenant = "greggschneider89gmail.onmicrosoft.com";
			string tenant = "6b188bb3-722f-43ec-8c64-5ec81dc576fe";
			var creds = new AzureCredentialsFactory().FromServicePrincipal(client, secret, tenant, AzureEnvironment.AzureGlobalCloud);
			string subscriptionId = "be6cb7f8-c55a-4882-90eb-3777b108b32f";
			Console.WriteLine(creds);
			//azure = Azure.Authenticate(creds).WithDefaultSubscription();
			//azure = Azure.Authenticate(creds).WithSubscription(subscriptionId);
			Console.WriteLine(azure);

			//Console.WriteLine("Creating a Windows VM");

			//var windowsVM = azure.VirtualMachines.Define("TestServerForAsureSDK")
			//	.WithRegion(Region.EuropeWest)
			//	.WithExistingResourceGroup("CTF_platform")
			//	.WithNewPrimaryNetwork("10.0.0.0/28")
			//	.WithPrimaryPrivateIPAddressDynamic()
			//	.WithoutPrimaryPublicIPAddress()
			//	.WithPopularWindowsImage(KnownWindowsVirtualMachineImage.WindowsServer2012R2Datacenter)
			//	.WithAdminUsername("rootz")
			//	.WithAdminPassword("GreggXCyberSparrow!1989SomEr03")
			//	.WithSize(VirtualMachineSizeTypes.StandardD3V2)
			//	.Create();

			//Console.WriteLine("Created a Windows VM: " + windowsVM.Id);
		}

		//private static async Task<DeploymentExtended> CreateTemplatedDeploymenttwo(TokenCredentials credentials, string subscriptionId, string resourceGroup, string templateUri, string parametersUri) {
		//	var resourceClient = new Microsoft.Azure.Management.ResourceManager.ResourceManagementClient(await GetAccessTokenAsync().Result) { SubscriptionId = subscriptionId };

		//	return await resourceClient.Deployments.BeginCreateOrUpdateAsync(resourceGroup, "mytemplateddeployment", new Deployment(
		//		new DeploymentProperties() {
		//			Mode = DeploymentMode.Incremental,
		//			TemplateLink = new TemplateLink(templateUri),
		//			ParametersLink = new ParametersLink(parametersUri)
		//		}));
		//}

		//private static async Task<AuthenticationResult> GetAccessTokenAsync() {
		//	var cc = new ClientCredential("{client}", "{secret}");
		//	var context = new AuthenticationContext("https://login.windows.net/{tenant}");
		//	var token = await context.AcquireTokenAsync("https://management.azure.com/", cc);
		//	if (token == null) {
		//		throw new InvalidOperationException("Could not get the token.");
		//	}
		//	return token;
		//}
	}
}