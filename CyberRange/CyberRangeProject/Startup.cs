using CyberRangeProject.Azure;
using CyberRangeProject.Data;
using CyberRangeProject.Data.Retriever;
using CyberRangeProject.Helpers.Helper;
using CyberRangeProject.JwtFeatures;
using CyberRangeProject.Models.Users;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

namespace CyberRangeProject
{
	public class Startup
	{
		public Startup(IConfiguration configuration) {
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services) {
			/**/
			/**/

			services.AddControllers();
			services.AddSwaggerGen(c => {
				c.SwaggerDoc("v1", new OpenApiInfo { Title = "CyberRangeProject", Version = "v1" });
			});

			services.AddIdentity<CyberSparrow, IdentityRole>(options => {
				options.Password.RequiredLength = 1;
				options.Password.RequiredUniqueChars = 1;
				options.Password.RequireDigit = false;
				options.Password.RequireNonAlphanumeric = false;
				options.Password.RequireUppercase = false;
				options.Password.RequireLowercase = false;
			}).AddEntityFrameworkStores<CyberSparrowContext>();

			var jwtSettings = Configuration.GetSection("JwtSettings");

			services.AddAuthentication(opt => {
				opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
			}).AddJwtBearer(options => {
				options.TokenValidationParameters = new TokenValidationParameters {
					ValidateIssuer = true,
					ValidateAudience = true,
					ValidateLifetime = true,
					ValidateIssuerSigningKey = true,
					ValidIssuer = jwtSettings.GetSection("validIssuer").Value,
					ValidAudience = jwtSettings.GetSection("validAudience").Value,
					IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.GetSection("securityKey").Value))
				};
			});

			services.AddDbContext<CyberSparrowContext>(options => {
				options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
			}
);

			/*Injections*/
			services.AddScoped<IUserHandler, UserHandler>();
			services.AddScoped<JwtHandler>();
			services.AddScoped<GameHandler>();
			services.AddScoped<TaskHandler>();
			services.AddScoped<PlayerGameHandler>();
			services.AddScoped<GameTaskHandler>();
			services.AddScoped<PlayerTaskHandler>();
			services.AddScoped<AzureApi>();
			services.AddScoped<VirtualMachineHandler>();
			services.AddScoped<RegistrationCodesHandler>();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
			if (env.IsDevelopment()) {
				app.UseDeveloperExceptionPage();
				app.UseSwagger();
				app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "CyberRangeProject v1"));
			}

			app.UseForwardedHeaders(new ForwardedHeadersOptions {
				ForwardedHeaders = ForwardedHeaders.All
			});

			app.UseHttpsRedirection();
			app.UseRouting();

			app.UseAuthentication();
			app.UseAuthorization();

			app.UseEndpoints(endpoints => {
				endpoints.MapControllers();//
			});
		}
	}
}