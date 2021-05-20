using AutoMapper;
using CyberRangeProject.Data.Retriever;
using CyberRangeProject.JwtFeatures;
using CyberRangeProject.Models;
using CyberRangeProject.Models.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CyberRangeProject.Controllers
{
	[Route("api/[controller]/[action]")]
	public class UserController : ControllerBase
	{
		private readonly UserManager<CyberSparrow> userManager;
		private readonly IUserHandler userHandler;
		private readonly JwtHandler jwtHandler;
		private readonly Microsoft.AspNetCore.Identity.SignInManager<CyberSparrow> signInManager;
		private readonly RegistrationCodesHandler rch;

		public UserController(
			UserManager<CyberSparrow> userManager,
			IUserHandler userHandler,
			JwtHandler jwtHandler,
			SignInManager<CyberSparrow> signInManager,
			RegistrationCodesHandler rch
			) {
			this.userManager = userManager;
			this.userHandler = userHandler;
			this.jwtHandler = jwtHandler;
			this.signInManager = signInManager;
			this.rch = rch;
		}

		[HttpGet]
		public async Task<List<CyberSparrow>> GetAllUsers() {
			return await userHandler.GetAllUsersAsync();
		}

		[HttpPost]
		public async Task<IActionResult> RegisterUserAsync([FromBody] RegisterModel userForRegistration) {
			if (userForRegistration == null || !ModelState.IsValid || string.IsNullOrWhiteSpace(userForRegistration.RegistrationCodeUsed))
				return BadRequest("Error: Check if all inputs are filled out!");

			if (!rch.IsCodeValid(userForRegistration.RegistrationCodeUsed)) {
				return BadRequest("Registration token is invalid");
			}

			//Watch out for duplicate usernames and emails in upperlowercase
			if (await userManager.FindByNameAsync(userForRegistration.UserName) != null) {
				return BadRequest("Usernamne is taken!");
			}

			if (await userManager.FindByEmailAsync(userForRegistration.Email) != null) {
				return BadRequest("Another account is already registered with this email!");
			}

			CyberSparrow user = new CyberSparrow() {
				Email = userForRegistration.Email,
				UserName = userForRegistration.UserName,
				FirstName = userForRegistration.FirstName,
				LastName = userForRegistration.LastName,
				Level = 1,
				TotalPoints = 0,
				RegistrationCodeUsed = userForRegistration.RegistrationCodeUsed,
				IsUserActive = true,
			};

			var result = await userManager.CreateAsync(user, userForRegistration.Password);
			if (!result.Succeeded) {
				var errors = result.Errors.Select(e => e.Description);

				return BadRequest("Unable to register user! Contact admin or try different credentials");
			}
			rch.UseRegistrationCode(userForRegistration.RegistrationCodeUsed);
			var x = await userManager.AddToRoleAsync(user, "Player");
			return StatusCode(201);
		}

		[HttpPost]
		public async Task<IActionResult> Login([FromBody] LoginModel userForAuthentication) {
			var user = await userManager.FindByNameAsync(userForAuthentication.Email);
			if (user == null || !await userManager.CheckPasswordAsync(user, userForAuthentication.Password))
				return BadRequest("Password and/or username mismatch");

			if (!user.IsUserActive) {
				return BadRequest("User is deactivated");
			}
			var res = await signInManager.PasswordSignInAsync(user, userForAuthentication.Password, true, false);
			var signingCredentials = jwtHandler.GetSigningCredentials();
			var claims = jwtHandler.GetClaims(user);
			var tokenOptions = jwtHandler.GenerateTokenOptions(signingCredentials, claims);
			var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
			return Ok(new LoginResponseModel { IsAuthSuccessful = true, Token = token });
		}

		[HttpGet("Claim")]
		[Authorize]
		public async Task<IActionResult> PrivacyAsync() {
			var user = await userManager.GetUserAsync(HttpContext.User);
			var email = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;

			var claims = User.Claims
				.Select(c => new { c.Type, c.Value })
				.ToList();
			var a = User.FindFirstValue(ClaimTypes.NameIdentifier);
			return Ok(claims);
		}

		[HttpGet]
		[Authorize]
		public async Task<CyberSparrow> GetPlayer() {
			var user = await userHandler.GetUserByEmail(HttpContext.User.Identity.Name);
			return user;
		}

		[HttpPost]
		[Authorize]
		public async Task<bool> UpdateProfile([FromBody] UpdateProfileModel value) {
			var user = await userHandler.GetUserByEmail(HttpContext.User.Identity.Name);
			user.Biography = value.Biography;
			user.PhoneNumber = value.PhoneNumber;
			if (value.Password.Length > 7)
				await userManager.ChangePasswordAsync(user, user.PasswordHash, value.Password);
			return userHandler.UpdateProfile(user, value);
		}

		[HttpPost]
		[Authorize(Roles = "Admin")]
		public async Task<bool> UpdateUserAsAdmin([FromBody] UpdateProfileAsAdminModel value) {
			var user = userHandler.GetUserById(value.Id);
			user.Email = value.Email;
			user.TotalPoints = value.Points;
			user.Level = value.Level;
			user.FirstName = value.FirstName;
			user.LastName = value.LastName;
			user.UserName = value.Username;
			if (value.Password.Length > 7 && !string.IsNullOrWhiteSpace(value.Password))
				await userManager.ChangePasswordAsync(user, user.PasswordHash, value.Password);
			if (!string.IsNullOrWhiteSpace(value.Role)) {
				var roles = await userManager.GetRolesAsync(user);
				if (!roles.Contains(value.Role)) {
					var result = await userManager.AddToRoleAsync(user, value.Role);
				}
			}
			return userHandler.UpdateProfile(user);
		}

		[HttpGet]
		[Authorize(Roles = "Admin")]
		public async Task<List<string>> GetUserRoleAsync([FromQuery] string userId) {
			var user = await userManager.FindByIdAsync(userId);
			if (user == null) {
				return new List<string>() { "404 User not found" };
			}
			var roles = await userManager.GetRolesAsync(user);
			return new List<string>(roles);
		}

		[HttpGet]
		[Authorize(Roles = "Admin")]
		public async Task<bool> DeactivateUser([FromQuery] string userId) {
			var user = await userManager.FindByIdAsync(userId);
			if (user == null) {
				return false;
			}
			user.IsUserActive = false;
			await userManager.UpdateAsync(user);
			return true;
		}
		[HttpGet]
		[Authorize(Roles = "Admin")]
		public async Task<bool> ActivateUser([FromQuery] string userId) {
			var user = await userManager.FindByIdAsync(userId);
			if (user == null) {
				return false;
			}
			user.IsUserActive = true;
			await userManager.UpdateAsync(user);
			return true;
		}

		[HttpGet]
		[Authorize(Roles = "Admin")]
		public async Task<bool> DeleteUser([FromQuery] string userId) {
			var user = await userManager.FindByIdAsync(userId);
			if (user == null) {
				return false;
			}
			user.IsUserActive = false;
			await userManager.DeleteAsync(user);
			return true;
		}

		[HttpPost]
		[Authorize]
		public async Task<bool> UpdateProfilePicture([FromBody] UrlModel urlm) {
			var user = await userHandler.GetUserByEmail(HttpContext.User.Identity.Name);
			var url = urlm.Url;
			return await userHandler.UpdateProfilePictureAsync(user, url);
		}

		[HttpGet]
		[Authorize]
		public async Task<bool> ChangeMyUserRoleAsync(string role) {
			var user = await userHandler.GetUserByEmail(HttpContext.User.Identity.Name);
			await userManager.AddToRoleAsync(user, role);
			return true;
		}

		[HttpGet]
		[Authorize(Roles = "Admin")]
		public async Task<bool> ChangeUserRoleAsync(string email, string role) {
			var user = await userHandler.GetUserByEmail(email);
			await userManager.AddToRoleAsync(user, role);
			return true;
		}

		[HttpPost]
		[Authorize]
		public async Task<bool> UpdateBanner([FromBody] UrlModel urlm) {
			var user = await userHandler.GetUserByEmail(HttpContext.User.Identity.Name);
			var url = urlm.Url;
			return await userHandler.UpdateProfileBannerPictureAsync(user, url);
		}

		[HttpPost]
		[Authorize(Roles = "Admin")]
		public bool AddRegistrationCodes([FromBody] RegistrationCodesModel model) {
			if (model.MaxUses < 1 || model.CodeId.Length < 1) {
				return false;
			}
			return rch.AddRegistrationCode(model);
		}

		[HttpPost]
		[Authorize(Roles = "Admin")]
		public bool UpdateRegistrationModel([FromBody] RegistrationCodesModel model) {
			if (model.MaxUses < 1 || model.CodeId.Length < 1) {
				return false;
			}
			return rch.UpdateRegistrationCode(model);
		}

		[HttpGet]
		[Authorize(Roles = "Admin")]
		public List<RegistrationCodesModel> GetAllRegistrationCodes() {
			return rch.GetAllCodes();
		}

		[HttpGet]
		[Authorize(Roles = "Admin")]
		public bool DeleteRegistrationCode([FromQuery] string code) {
			return rch.DeleteCode(code);
		}

		public class UpdateProfileModel
		{
			public string Biography { get; set; }
			public string Password { get; set; }
			public string PhoneNumber { get; set; }
		}

		public class UpdateProfileAsAdminModel
		{
			public int Points { get; set; }
			public int Level { get; set; }
			public string Email { get; set; }
			public string Id { get; set; }
			public string FirstName { get; set; }
			public string LastName { get; set; }
			public string Username { get; set; }
			public string Password { get; set; }
			public string Role { get; set; }
		}

		public class UrlModel
		{
			public string Url { get; set; }
		}
	}
}