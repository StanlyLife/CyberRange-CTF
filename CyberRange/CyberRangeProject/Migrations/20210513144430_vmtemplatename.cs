using Microsoft.EntityFrameworkCore.Migrations;

namespace CyberRangeProject.Migrations
{
    public partial class vmtemplatename : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<string>(
                name: "VmTemplate",
                table: "Game",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "fa954d11-cca1-471a-966d-981251ba8af7", "fc3cc630-2fa3-4fed-a7a2-687e68276b43", "Player", "PLAYER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "31fc086d-7388-4331-9f18-865e15ba868b", "bb5fd15d-87eb-4499-a47f-a9a1e8fff31a", "Employee", "EMPLOYEE" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "944668fe-c325-494a-be8e-b4dabc537df0", "76938943-b78b-4067-8474-994f64c166d6", "Admin", "ADMIN" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "31fc086d-7388-4331-9f18-865e15ba868b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "944668fe-c325-494a-be8e-b4dabc537df0");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fa954d11-cca1-471a-966d-981251ba8af7");

            migrationBuilder.DropColumn(
                name: "VmTemplate",
                table: "Game");

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
    }
}
