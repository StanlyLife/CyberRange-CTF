using Microsoft.EntityFrameworkCore.Migrations;

namespace CyberRangeProject.Migrations
{
    public partial class game_props : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "06c6f843-132d-4a04-88cc-09943cc5d033");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "223e4197-fe84-4682-b221-bcdebbe77485");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "59e76c88-341e-4ce3-a74e-ed96e97a9fd2");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Game",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "PasswordRequired",
                table: "Game",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "6b70de4c-0b6e-47bf-ba18-dc4037f2b155", "29c0eb7c-ff70-4ed2-b2bb-b944038ff2ae", "Player", "PLAYER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "6298675d-a2e6-4e3f-845a-ec5dfbd09a57", "e3223c4a-cb76-4d99-86dc-8fb6a9a02878", "Employee", "EMPLOYEE" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "b98a24f0-0555-4272-a219-72536fd8c848", "fb64af51-85fe-491f-855c-38e78b94f8e4", "Admin", "ADMIN" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6298675d-a2e6-4e3f-845a-ec5dfbd09a57");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6b70de4c-0b6e-47bf-ba18-dc4037f2b155");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b98a24f0-0555-4272-a219-72536fd8c848");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "Game");

            migrationBuilder.DropColumn(
                name: "PasswordRequired",
                table: "Game");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "06c6f843-132d-4a04-88cc-09943cc5d033", "cdd352b6-e95f-4efe-b55d-6af7abbc17e1", "Player", "PLAYER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "223e4197-fe84-4682-b221-bcdebbe77485", "25ab271a-fe42-47da-bbdf-33173e718740", "Employee", "EMPLOYEE" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "59e76c88-341e-4ce3-a74e-ed96e97a9fd2", "56bcba14-69b1-442a-be3e-77b6b9317240", "Admin", "ADMIN" });
        }
    }
}
