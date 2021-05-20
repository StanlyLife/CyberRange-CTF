using Microsoft.EntityFrameworkCore.Migrations;

namespace CyberRangeProject.Migrations
{
    public partial class game_hidden : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1e9eb7e8-2039-423e-a52e-9ad525fb6bd5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "eba996f1-9df4-45ae-8347-50464f6f1a9d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ec85fe04-baac-46b3-aa45-a33740d833f8");

            migrationBuilder.AddColumn<bool>(
                name: "Hidden",
                table: "Game",
                type: "bit",
                nullable: false,
                defaultValue: false);

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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "Hidden",
                table: "Game");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "1e9eb7e8-2039-423e-a52e-9ad525fb6bd5", "c39f6d6a-45f3-4c16-a72b-b801bb6fd44b", "Player", "PLAYER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "eba996f1-9df4-45ae-8347-50464f6f1a9d", "1c2c2b9e-19d1-473d-8a2c-dc9740ca818c", "Employee", "EMPLOYEE" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "ec85fe04-baac-46b3-aa45-a33740d833f8", "ef52399d-c26f-48c6-b769-314c067d5476", "Admin", "ADMIN" });
        }
    }
}
