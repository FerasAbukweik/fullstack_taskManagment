import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FullProject } from '../../../interfaces/project/full_project';
import { Task } from '../../../interfaces/task/task';
import { updateTaskDTO } from '../../../interfaces/task/update-task-dto';
import { AddProjectDTO } from '../../../interfaces/project/add-project-dto';
import { AddTaskDTO } from '../../../interfaces/task/add-task-dto';
import { SearchArea } from './main-page-components/search-area/search-area';
import { FilterOptions } from './main-page-components/filter-options/filter-options';
import { EditTask } from './main-page-components/edit-task/edit-task';
import { AddProject } from './main-page-components/add-project/add-project';
import { AddTask } from './main-page-components/add-task/add-task';
import { Message } from '../../shared-components/message/message';
import { ConfirmationMessage } from '../../shared-components/confirmation-message/confirmation-message';
import { ConfirmationMessageInputData } from '../../components-interfaces/confirmation-message-input-data';
import { ProjectsServices } from '../../../services/projects/projects-services';
import { TasksServices } from '../../../services/tasks/tasks-services';
import { EditDiscription } from './main-page-components/edit-discription/edit-discription';
import { updateDescriptionData } from '../../../interfaces/task/update-description-data';

@Component({
  selector: 'app-main-page',
  imports: [
    FormsModule,
    SearchArea,
    FilterOptions,
    EditTask,
    AddProject,
    AddTask,
    Message,
    ConfirmationMessage,
    EditDiscription,
  ],
  templateUrl: './main-page.html',
  styleUrls: ['./main-page.css'],
})
export class MainPage implements OnInit {
  constructor(private _projecstServices: ProjectsServices, private _tasksServices: TasksServices) {}

  projectsData: Map<number, FullProject> = new Map<number, FullProject>();
  projectsNames: Map<number, string> = new Map<number, string>();
  projectKeys: number[] = [];
  projectsDataArray: FullProject[] = [];

  searchInput: string = '';
  showFilterOptions: boolean = false;
  selectedFilterOptions: number = 0;
  showEditTasks: boolean = false;
  currTask: Task | undefined;
  messageToShow: string = '';
  showAddProject: boolean = false;
  showAddTask: boolean = false;
  currProject: number | undefined;
  showConfirmDeleteProject: boolean = false;
  showDescription: boolean = false;
  confirmDeleteProjectData: ConfirmationMessageInputData = {
    confirmButtonColor: 'red',
    confirmButtonText: 'Delete',
    message: 'Your About To Delete This Project',
  };

  ngOnInit(): void {
    this.updateProjects();
  }

  updateProjects(): void {
    this._projecstServices.getFullProjects().subscribe({
      next: (res: any) => {
        const newProjectsData = new Map<number, FullProject>();
        const newProjectsNames = new Map<number, string>();

        res.forEach((fullProject: any) => {
          const tempTasks = new Map<number, Task>();
          fullProject.tasks.forEach((task: any) => {
            tempTasks.set(task.id, {
              id: task.id,
              projectId: task.projectId,
              title: task.title,
              description: task.description,
              mark: task.mark,
              createdAt: task.createdAt,
              GoalDate: task.goalDate,
              updatedAt: task.updatedAt,
            });
          });

          newProjectsData.set(fullProject.projectId, {
            id: fullProject.projectId,
            name: fullProject.projectName,
            headerColor: fullProject.headerColor,
            tasks: tempTasks,
          });

          newProjectsNames.set(fullProject.projectId, fullProject.projectName);
        });

        this.projectsData = newProjectsData;
        this.projectsNames = newProjectsNames;
        this.projectKeys = Array.from(this.projectsData.keys());
        this.projectsDataArray = Array.from(this.projectsData.values());
      },
      error: (err) => {
        this.messageToShow = err.error?.message ?? err.error ?? 'Unexpected Error';
      },
    });
  }

  closeAll(): void {
    this.searchInput = '';
    this.showFilterOptions = false;
  }

  toggleShowFilterOptions() {
    this.showFilterOptions = !this.showFilterOptions;
    this.searchInput = '';
  }

  toggleStatus(projectId: number, taskId: number) {}
  addTask(toAddData: AddTaskDTO): void {
    toAddData.projectId = this.currProject!;
    this._tasksServices.add(toAddData).subscribe({
      next: (res: any) => {
        this.updateProjects();
      },
      error: (err) => (this.messageToShow = err.error?.message ?? err.error ?? 'Unexpected Error'),
    });
  }
  deleteTask() {
    this._tasksServices.delete(this.currTask!.id).subscribe({
      next: (ret: any) => {
        this.updateProjects();
      },
      error: (err) => (this.messageToShow = err.error?.message ?? err.error ?? 'Unexpected Error'),
    });
  }
  updateTask(toUpdate: updateTaskDTO) {
    this._tasksServices.update(toUpdate).subscribe({
      next: (ret: any) => {
        this.updateProjects();
      },
      error: (err) => (this.messageToShow = err.error?.message ?? err.error ?? 'Unexpected Error'),
    });
  }
  addProject(toAdd: AddProjectDTO) {
    this._projecstServices.add(toAdd).subscribe({
      next: (ret: any) => {
        this.updateProjects();
      },
      error: (err) => (this.messageToShow = err.error?.message ?? err.error ?? 'Unexpected Error'),
    });
  }
  deleteProject(toDelId: number) {
    this._projecstServices.delete(toDelId).subscribe({
      next: (ret: any) => {
        this.updateProjects();
      },
      error: (err) => (this.messageToShow = err.error?.message ?? err.error ?? 'Unexpected Error'),
    });
  }
  manageConfirmDeleteMessage(isConfirmed: boolean): void {
    if (isConfirmed) {
      this.deleteProject(this.currProject!);
    }
    this.showConfirmDeleteProject = false;
  }

  updateDescription(newDescription: string): void {
    let toUpdate: updateDescriptionData = {
      newDescription: newDescription,
      taskId: this.currTask!.id,
    };
    this._tasksServices.updateDescription(toUpdate).subscribe({
      next: (ret: any) => {
        this.updateProjects();
      },
      error: (err) => (this.messageToShow = err.error?.message ?? err.error ?? 'Unexpected Error'),
    });
  }
}
