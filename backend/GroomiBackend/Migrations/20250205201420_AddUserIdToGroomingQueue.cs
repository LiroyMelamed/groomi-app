using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GroomiBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddUserIdToGroomingQueue : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "GroomingQueue");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "GroomingQueue",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "GroomingQueue");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "GroomingQueue",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
