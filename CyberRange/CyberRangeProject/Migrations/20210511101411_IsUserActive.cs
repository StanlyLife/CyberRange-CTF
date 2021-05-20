using Microsoft.EntityFrameworkCore.Migrations;

namespace CyberRangeProject.Migrations
{
    public partial class IsUserActive : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "26d3ab30-a3f7-401d-8846-fbafce332db0");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a183b25c-ee2a-4148-a92d-af6c16768fb3");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b099c366-cd32-4a57-b9b4-d714f38c1508");

            migrationBuilder.AddColumn<bool>(
                name: "IsUserActive",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "7fdcc7b8-7c44-430d-93d6-1f91f1f6d81d", "c86f3450-ccc5-48e5-9087-e605d976f3a0", "Player", "PLAYER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "a1b34e4d-4603-4520-b57e-9a7c9de25d6d", "9f6cb740-558d-435f-a581-543ea8eb8cab", "Employee", "EMPLOYEE" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "2bb6cb09-6d7e-47e3-a630-423cf7d5bb85", "4bf37431-05cd-4518-8927-52bc3b1da062", "Admin", "ADMIN" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2bb6cb09-6d7e-47e3-a630-423cf7d5bb85");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7fdcc7b8-7c44-430d-93d6-1f91f1f6d81d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a1b34e4d-4603-4520-b57e-9a7c9de25d6d");

            migrationBuilder.DropColumn(
                name: "IsUserActive",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "b099c366-cd32-4a57-b9b4-d714f38c1508", "ca0dacb3-4000-4355-8ad9-de6313a8afed", "Player", "PLAYER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "a183b25c-ee2a-4148-a92d-af6c16768fb3", "deef49c5-a279-4b9f-b9e9-803dc1ce8375", "Employee", "EMPLOYEE" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "26d3ab30-a3f7-401d-8846-fbafce332db0", "c922bad6-2aab-4adb-8269-ebba8c5eeab3", "Admin", "ADMIN" });
        }
    }
}
