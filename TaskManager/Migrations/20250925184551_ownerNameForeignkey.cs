using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskManager.Migrations
{
    /// <inheritdoc />
    public partial class ownerNameForeignkey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Projects_ownerId",
                table: "Projects",
                column: "ownerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Users_ownerId",
                table: "Projects",
                column: "ownerId",
                principalTable: "Users",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Users_ownerId",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Projects_ownerId",
                table: "Projects");
        }
    }
}
