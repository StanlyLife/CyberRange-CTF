using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace CyberRangeProject.Azure
{
	public class AzureApi
	{
		private string subscriptionId = "xxx";
		private string resourceGroup = "xxx";
		private readonly string Toolvm = "xxx";

		public async Task<List<string>> GetAllTemplatesAsync() {
			var client = new RestClient();
			client.Timeout = -1;
			var request = new RestRequest(Method.GET);
			IRestResponse response = await client.ExecuteTaskAsync(request);
			XmlDocument xmlResponse = new XmlDocument();
			var xml = response.Content;
			xml = xml.Remove(0, 1);
			Console.WriteLine(xml);
			xmlResponse.LoadXml(xml);
			//Console.WriteLine(response.Content);
			Console.WriteLine(JsonConvert.SerializeXmlNode(xmlResponse));
			var jsonObject = JsonConvert.SerializeXmlNode(xmlResponse);
			Console.WriteLine(JObject.Parse(jsonObject)["EnumerationResults"]["Blobs"]["Blob"]);
			List<string> templates = new List<string>();
			foreach (var blob in JObject.Parse(jsonObject)["EnumerationResults"]["Blobs"]["Blob"]) {
				//BLOBNAME
				string templateName = blob["Name"].ToString();
				templates.Add(templateName);
			}
			return templates;
		}

		public async Task<string> GetBearerTokenAsync() {
			var client = new RestClient("xxxx");
			client.Timeout = -1;
			var request = new RestRequest(Method.POST);
			request.AddHeader("Cookie", "xxx");
			request.AlwaysMultipartFormData = true;
			request.AddParameter("grant_type", "client_credentials");
			request.AddParameter("client_id", "a47b7fc5-fbd2-4629-a69e-5a53e0df9680");
			request.AddParameter("client_secret", " zoWUAej.dW9_PLz~Gx3~.Qln49iKw55r5~ ");
			request.AddParameter("resource", " https://management.azure.com/");
			IRestResponse response = await client.ExecuteAsync(request);
			var bearerToken = JObject.Parse(response.Content)["access_token"];
			return bearerToken.ToString();
		}

		public async Task<List<string>> GetAllVmAsync(string bearer) {
			var client = new RestClient($"xxx");
			client.Timeout = -1;
			var request = new RestRequest(Method.GET);
			request.AddHeader("Authorization", $"Bearer {bearer}");
			IRestResponse response = await client.ExecuteAsync(request);
			Console.WriteLine(response.Content);
			var machines = JObject.Parse(response.Content)["value"];
			List<string> VirtualMachines = new List<string>();
			foreach (var machine in machines) {
				var name = machine["name"];
				var id = machine["id"];
				var vmId = machine["properties"]["vmId"];
				Console.WriteLine($"Name: {name} \nid: {id}\nvmId: {vmId}\n");
				VirtualMachines.Add(name.ToString());
			}
			return VirtualMachines;
		}

		public async Task<bool> StopDeallocateVmAsync(string vmName, string bearerToken) {
			var client = new RestClient($"xxx");
			client.Timeout = -1;
			var request = new RestRequest(Method.POST);
			request.AddHeader("Authorization", $"Bearer {bearerToken}");
			IRestResponse response = await client.ExecuteAsync(request);
			Console.WriteLine(response.Content);
			return true;
		}

		public async Task<string> StopAllVmAsync(string bearer) {
			string jobname = Guid.NewGuid().ToString();
			var client = new RestClient($"xxx");
			client.Timeout = -1;
			var request = new RestRequest(Method.PUT);
			request.AddHeader("Authorization", $"Bearer {bearer}");
			request.AddHeader("Content-Type", "application/json");
			request.AddParameter("application/json", "{\r\n  \"properties\": {\r\n    \"runbook\": {\r\n      \"name\": \"Stop-all-nonCrit-VM\"\r\n    },\r\n    \"parameters\": {\r\n      \r\n    },\r\n    \"runOn\": \"\"\r\n  }\r\n}", ParameterType.RequestBody);
			IRestResponse response = await client.ExecuteAsync(request);
			Console.WriteLine(response.Content);
			return response.Content;
		}

		public async Task<string> GetInfoOnVmAsync(string bearer, string vmName) {
			var client = new RestClient($"xxx");
			client.Timeout = -1;
			var request = new RestRequest(Method.GET);
			request.AddHeader("Authorization", $"Bearer {bearer}");
			IRestResponse response = await client.ExecuteAsync(request);
			Console.WriteLine(response.Content);

			var information = JObject.Parse(response.Content)["statuses"];
			if (information == null) {
				return "deploying";
			}
			Console.WriteLine();
			Console.WriteLine(information);
			foreach (var machine in information) {
				var status = machine["displayStatus"];
				var code = machine["code"];
				Console.WriteLine($"Staus: {status}\nCode: {code}");
			}

			return response.Content;
		}

		//Delete VM and all resources connected to the VM
		public async Task<string> DeleteVmAndAllResources(string bearer, string vmName) {
			string jobname = Guid.NewGuid().ToString();
			var automationAccount = "USN-automation";
			var client = new RestClient($"xxx");
			client.Timeout = -1;
			var request = new RestRequest(Method.PUT);
			request.AddHeader("Authorization", $"Bearer {bearer}");
			request.AddHeader("Content-Type", "application/json");
			request.AddParameter("application/json", "{\r\n  \"properties\": {\r\n    \"runbook\": {\r\n      \"name\": \"Remove-VM-and-files-args\"\r\n    },\r\n    \"parameters\": {\r\n      \"VMname\": \"" +
				vmName +
				"\"\r\n    },\r\n    \"runOn\": \"\"\r\n  }\r\n}", ParameterType.RequestBody);
			IRestResponse response = await client.ExecuteAsync(request);
			Console.WriteLine(response.Content);
			return response.Content;
		}

		public async Task<string> CreateToolsVmAsync(string bearer) {
			string jobname = Guid.NewGuid().ToString();
			var templateUri = $"xxx";
			var client = new RestClient($"xxx");
			client.Timeout = -1;
			var request = new RestRequest(Method.PUT);
			request.AddHeader("Authorization", $"Bearer {bearer}");
			request.AddHeader("Content-Type", "application/json");
			request.AddParameter("application/json", "{\r\n \"properties\": {\r\n   \"templateLink\": {\r\n     \"uri\": \"" +
				templateUri
				+ "\",\r\n     \"contentVersion\": \"1.0.0.0\"\r\n   },\r\n   \"mode\": \"Incremental\"\r\n }\r\n}", ParameterType.RequestBody);
			IRestResponse response = await client.ExecuteAsync(request);
			Console.WriteLine(response.Content);
			//VM Name

			var obj = JObject.Parse(response.Content);
			if (obj["error"] != null) {
				throw new NullReferenceException("VM IS STILL DEPLOYING");
			}
			var vmProperties = obj["properties"];
			var vmNicParam = vmProperties["parameters"];
			var vmNic = vmNicParam["networkInterfaceName"];
			var vmName = vmNic["value"].ToString();
			return vmName;
		}

		public async Task<string> AddTagToVm(string bearer, string vmName, string tagName, string tagValue) {
			var client = new RestClient($"xxx");
			client.Timeout = -1;
			var request = new RestRequest(Method.PUT);
			request.AddHeader("Authorization", $"Bearer {bearer}");
			request.AddHeader("Content-Type", "application/json");
			request.AddParameter("application/json", "{\r\n  \"properties\": {\r\n    \"tags\": {\r\n      \"" +
				tagName +
				"\": \"" +
				tagValue +
				"\",\r\n      \"asignedThrough\": \"API\"\r\n    }\r\n  }\r\n}", ParameterType.RequestBody);
			IRestResponse response = client.Execute(request);
			Console.WriteLine(response.Content);
			return response.Content;
		}

		public async Task<string> RemoveVmWithTags(string bearer, string tagName, string tagValue) {
			string jobname = Guid.NewGuid().ToString();
			var client = new RestClient($"xxx");
			client.Timeout = -1;
			var request = new RestRequest(Method.PUT);
			request.AddHeader("Authorization", $"Bearer {bearer}");
			request.AddHeader("Content-Type", "application/json");
			request.AddParameter("application/json", "{\r\n  \"properties\": {\r\n    \"runbook\": {\r\n      \"name\": \"Remove-based-on-tag\"\r\n    },\r\n    \"parameters\": {\r\n      \"TagName\": \"" +
				tagName +
				"\",\r\n      \"TagValue\": \"" +
				tagValue +
				"\"\r\n    },\r\n    \"runOn\": \"\"\r\n  }\r\n}", ParameterType.RequestBody);
			IRestResponse response = await client.ExecuteAsync(request);
			Console.WriteLine(response.Content);
			return response.Content;
		}

		public async Task<string> GetVmIp(string bearer, string vmName) {
			var client = new RestClient($"xxx");
			client.Timeout = -1;
			var request = new RestRequest(Method.GET);
			request.AddHeader("Authorization", $"Bearer {bearer}");
			IRestResponse response = await client.ExecuteAsync(request);
			var obj = JObject.Parse(response.Content);
			var props = obj["properties"];
			var ip = props["ipAddress"].ToString();
			return ip;
		}

		public async Task<string> GetTaskVmIp(string bearer, string vmName) {
			var client = new RestClient($"xxx");
			client.Timeout = -1;
			var request = new RestRequest(Method.GET);
			request.AddHeader("Authorization", $"Bearer {bearer}");
			IRestResponse response = await client.ExecuteAsync(request);
			var obj = JObject.Parse(response.Content);
			var value = obj["value"];
			var props = value[0]["properties"];
			var ip = props["ipAddress"].ToString();
			return ip;
		}

		public async Task<string> CreateTaskVmAsync(string bearer, string templateUri) {
			string jobname = Guid.NewGuid().ToString();
			var client = new RestClient($"xxx");
			client.Timeout = -1;
			var request = new RestRequest(Method.PUT);
			request.AddHeader("Authorization", $"Bearer {bearer}");
			request.AddHeader("Content-Type", "application/json");
			request.AddParameter("application/json", "{\r\n \"properties\": {\r\n   \"templateLink\": {\r\n     \"uri\": \"" +
				templateUri
				+ "\",\r\n     \"contentVersion\": \"1.0.0.0\"\r\n   },\r\n   \"mode\": \"Incremental\"\r\n }\r\n}", ParameterType.RequestBody);
			IRestResponse response = await client.ExecuteAsync(request);
			Console.WriteLine(response.Content);
			//VM Name

			var obj = JObject.Parse(response.Content);
			if (obj["error"] != null) {
				throw new NullReferenceException("VM IS STILL DEPLOYING");
				return "Vm is still deploying";
			}
			var vmProperties = obj["properties"];
			var vmNicParam = vmProperties["parameters"];
			var vmNic = vmNicParam["networkInterfaceName"];
			var vmName = vmNic["value"].ToString();
			return vmName;
		}

		public async Task<string> DeleteVmScheduleAsync(string bearer, DateTime start, string vmName) {
			//Expiretime needs to be less than 1 hour before start and more than 30 minutes
			string jobname = Guid.NewGuid().ToString();
			//Retract 2 hours because of gmt+1 and summer time
			start = start.AddHours(-2);
			start = start.AddMinutes(15);
			DateTime endTime = start.AddMinutes(45);
			string startString = String.Format("{0:s}", start);
			string endTimeString = String.Format("{0:s}", endTime);
			var client = new RestClient(
				$"xxx");
			client.Timeout = -1;
			var request = new RestRequest(Method.PUT);
			request.AddHeader("Authorization", $"Bearer {bearer}");
			request.AddHeader("Content-Type", "application/json");
			request.AddParameter(
				"application/json",
				"{ \"properties\" :" +
				" { \"description\" : \"If you want a description, add it here or remove this property\"," +
				$" \"startTime\" : \"{startString} \", \"expiryTime\": \"{endTimeString}\"" +
				",\"frequency\":\"Hour\", \"interval\": 1,\"timeZone\":\"CET\",\"advancedSchedule\":{} }\r\n}", ParameterType.RequestBody);
			IRestResponse response = await client.ExecuteAsync(request);
			return await LinkJobToDeleteVmTimeAsync(bearer, jobname, vmName);
		}

		public async Task<string> LinkJobToDeleteVmTimeAsync(string bearer, string jobname, string vmName) {
			string jobid = Guid.NewGuid().ToString();
			var client = new RestClient(
			$"xxx");
			client.Timeout = -1;
			var request = new RestRequest(Method.PUT);
			request.AddHeader("Authorization", $"Bearer {bearer}");
			request.AddHeader("Content-Type", "application/json");
			request.AddParameter("application/json", "{\r\n \"properties\":\r\n {\r\n" +
				"\"runbook\":\r\n {\r\n  \"name\": \"Remove-VM-and-files-args\"  \r\n" +
				"},\r\n \"parameters\":\r\n " +
				"{\r\n \"VMname\":\"" +
				$"{vmName}" +
				"\"\r\n }," +
				"\r\n \"schedule\": \r\n {\r\n " +
				$"\"name\": \"" +
				$"{jobname}" +
				"\"\r\n }\r\n }\r\n}"
				, ParameterType.RequestBody);
			IRestResponse response = await client.ExecuteAsync(request);
			return response.Content;
		}
	}
}