import { Component, EventEmitter, Input, OnInit, output, Output } from '@angular/core';
import { ConfirmationMessage } from '../../../../shared-components/confirmation-message/confirmation-message';
import { ConfirmationMessageInputData } from '../../../../components-interfaces/confirmation-message-input-data';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Task } from '../../../../../interfaces/task/task';
import { updateTaskDTO } from '../../../../../interfaces/task/update-task-dto';

@Component({
  selector: 'app-edit-task',
  imports: [ConfirmationMessage, ReactiveFormsModule, DatePipe],
  providers: [DatePipe],
  templateUrl: './edit-task.html',
  styleUrl: './edit-task.css',
})
export class EditTask implements OnInit {
  constructor(private _datePipe: DatePipe) {}

  //if true show
  showConfirmDeleteMessage: boolean = false;
  showConfirmEditMessage: boolean = false;
  //

  //task types to select in type section
  @Input() projectsNames!: Map<number, string>;
  //curr task data
  @Input() currTask!: Task;
  @Output() startDelete = new EventEmitter<boolean>();
  @Output() UpdateData = new EventEmitter<updateTaskDTO>();
  @Output() hideThisMessage = new EventEmitter<boolean>();

  confirmDeleteMessageData: ConfirmationMessageInputData = {
    confirmButtonColor: '#EF4444',
    confirmButtonText: 'Delete',
    message: 'Are You Sure Your About To Delete This Task',
  };

  confirmEditMessageData: ConfirmationMessageInputData = {
    confirmButtonColor: '#3B82F6',
    confirmButtonText: 'Edit',
    message: 'Are You Sure Your About To Edit This Task',
  };

  // selected options
  SelectedOptions!: FormGroup;

  //init values for selected options (same task values)
  ngOnInit(): void {
    this.SelectedOptions = new FormGroup({
      title: new FormControl(this.currTask.title),
      goalDate: new FormControl(
        this.currTask.GoalDate
          ? this._datePipe.transform(this.currTask.GoalDate, 'yyyy-MM-dd')
          : null
      ),
      project: new FormControl(this.currTask.projectId),
    });
  }

  //close all messages
  closeMessages() {
    this.showConfirmDeleteMessage = false;
    this.showConfirmEditMessage = false;
  }

  //if clicked delete button
  manageDeleteMessage(isConfirmed: boolean) {
    if (isConfirmed) {
      this.startDelete.emit(true);
      this.hideThisMessage.emit(true);
    }

    this.closeMessages();
  }

  //if clicked edit button
  manageEditMessage(isConfirmed: boolean) {
    if (isConfirmed) {
      this.UpdateData.emit({
        taskId: this.currTask.id,
        title: this.SelectedOptions.get('title')?.value ?? null,
        GoalDate: this.SelectedOptions.get('goalDate')?.value ?? null,
        projectId: this.SelectedOptions.get('project')!.value,
      } as updateTaskDTO);
      this.hideThisMessage.emit(true);
    }

    this.closeMessages();
  }
}
