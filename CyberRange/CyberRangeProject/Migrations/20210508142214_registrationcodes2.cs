using Microsoft.EntityFrameworkCore.Migrations;

namespace CyberRangeProject.Migrations
{
    public partial class registrationcodes2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "34a6ce2f-3c14-4be4-a8b9-878690f5529e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8eac7692-30b8-4d09-b5d9-745d23224e83");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e043380e-ba65-4947-a61a-cf36d90af1b7");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "RegistrationCodes",
                type: "bit",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<int>(
                name: "Active",
                table: "RegistrationCodes",
                type: "int",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "34a6ce2f-3c14-4be4-a8b9-878690f5529e", "0f823fc3-ca99-42a0-adec-4db39a025e79", "Player", "PLAYER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "8eac7692-30b8-4d09-b5d9-745d23224e83", "f51aa5fc-76aa-4f6e-9ca2-08b371a23dfe", "Employee", "EMPLOYEE" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "e043380e-ba65-4947-a61a-cf36d90af1b7", "a9230133-a566-4289-a391-7f155971949b", "Admin", "ADMIN" });
        }
    }
}
