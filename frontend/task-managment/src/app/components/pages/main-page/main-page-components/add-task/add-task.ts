import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationMessage } from '../../../../shared-components/confirmation-message/confirmation-message';
import { ConfirmationMessageInputData } from '../../../../components-interfaces/confirmation-message-input-data';
import { Task } from '../../../../../interfaces/task/task';
import { DatePipe } from '@angular/common';
import { AddTaskDTO } from '../../../../../interfaces/task/add-task-dto';

@Component({
  selector: 'app-add-task',
  imports: [ReactiveFormsModule, ConfirmationMessage],
  providers: [DatePipe],
  templateUrl: './add-task.html',
  styleUrls: ['./add-task.css'],
})
export class AddTask implements OnInit {
  @Output() hideThisMessage = new EventEmitter<boolean>();
  @Output() toAddData = new EventEmitter<AddTaskDTO>();

  showConfirmAddMessage: boolean = false;
  showReqTitle: boolean = false;

  toAdd!: FormGroup;

  confirmAddMessageData: ConfirmationMessageInputData = {
    confirmButtonColor: '#169e11ff',
    confirmButtonText: 'Add',
    message: 'Are You Sure Your About To Add This Task',
  };

  constructor(private _datePipe: DatePipe) {}

  ngOnInit(): void {
    this.toAdd = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      GoalDate: new FormControl(''),
    });
  }

  manageAddBtn(): void {
    if (this.toAdd.valid) {
      this.showConfirmAddMessage = true;
      this.showReqTitle = false;
      return;
    }
    if (this.toAdd.get('title')?.invalid) this.showReqTitle = true;
  }

  manageAddMessage(isConfirmed: boolean) {
    if (isConfirmed) {
      this.addTask();
      this.hideThisMessage.emit(false);
    }
    this.closeMessages();
  }

  closeMessages() {
    this.showConfirmAddMessage = false;
  }

  addTask() {
    this.toAddData.emit({
      projectId: 0,
      title: this.toAdd.value.title,
      description: this.toAdd.value.description,
      GoalDate: this.toAdd.value.GoalDate ? new Date(this.toAdd.value.GoalDate) : null,
    } as AddTaskDTO);
  }
}
