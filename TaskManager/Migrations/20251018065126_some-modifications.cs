using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskManager.Migrations
{
    /// <inheritdoc />
    public partial class somemodifications : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Users_ownerId",
                table: "Projects");

            migrationBuilder.DropTable(
                name: "TaskItems");

            migrationBuilder.DropColumn(
                name: "birthdate",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "createdAt",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "description",
                table: "Projects");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Users",
                newName: "userName");

            migrationBuilder.RenameColumn(
                name: "ownerId",
                table: "Projects",
                newName: "userId");

            migrationBuilder.RenameIndex(
                name: "IX_Projects_ownerId",
                table: "Projects",
                newName: "IX_Projects_userId");

            migrationBuilder.AddColumn<string>(
                name: "color",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    createdAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    goalDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    updatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    mark = table.Column<bool>(type: "bit", nullable: false),
                    projectId = table.Column<long>(type: "bigint", nullable: true),
                    userId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.id);
                    table.ForeignKey(
                        name: "FK_Tasks_Projects_projectId",
                        column: x => x.projectId,
                        principalTable: "Projects",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Tasks_Users_userId",
                        column: x => x.userId,
                        principalTable: "Users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_projectId",
                table: "Tasks",
                column: "projectId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_userId",
                table: "Tasks",
                column: "userId");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Users_userId",
                table: "Projects",
                column: "userId",
                principalTable: "Users",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Users_userId",
                table: "Projects");

            migrationBuilder.DropTable(
                name: "Tasks");

            migrationBuilder.DropColumn(
                name: "color",
                table: "Projects");

            migrationBuilder.RenameColumn(
                name: "userName",
                table: "Users",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "userId",
                table: "Projects",
                newName: "ownerId");

            migrationBuilder.RenameIndex(
                name: "IX_Projects_userId",
                table: "Projects",
                newName: "IX_Projects_ownerId");

            migrationBuilder.AddColumn<DateTime>(
                name: "birthdate",
                table: "Users",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "createdAt",
                table: "Projects",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "description",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TaskItems",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    assigneeId = table.Column<long>(type: "bigint", nullable: true),
                    projectId = table.Column<long>(type: "bigint", nullable: false),
                    createdAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    dueDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    priority = table.Column<int>(type: "int", nullable: false),
                    status = table.Column<int>(type: "int", nullable: false),
                    title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    updatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskItems", x => x.id);
                    table.ForeignKey(
                        name: "FK_TaskItems_Projects_projectId",
                        column: x => x.projectId,
                        principalTable: "Projects",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TaskItems_Users_assigneeId",
                        column: x => x.assigneeId,
                        principalTable: "Users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_TaskItems_assigneeId",
                table: "TaskItems",
                column: "assigneeId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskItems_projectId",
                table: "TaskItems",
                column: "projectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Users_ownerId",
                table: "Projects",
                column: "ownerId",
                principalTable: "Users",
                principalColumn: "id");
        }
    }
}
