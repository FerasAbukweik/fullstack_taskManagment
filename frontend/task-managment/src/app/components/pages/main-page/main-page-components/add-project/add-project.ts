import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationMessage } from '../../../../shared-components/confirmation-message/confirmation-message';
import { ConfirmationMessageInputData } from '../../../../components-interfaces/confirmation-message-input-data';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddProjectDTO } from '../../../../../interfaces/project/add-project-dto';

@Component({
  selector: 'app-add-project',
  imports: [ConfirmationMessage, ReactiveFormsModule],
  templateUrl: './add-project.html',
  styleUrl: './add-project.css',
})
export class AddProject {
  showConfirmAddMessage: boolean = false;
  @Output() hideThisMessage = new EventEmitter<boolean>();
  @Output() toAddData = new EventEmitter<AddProjectDTO>();

  showReqName: boolean = false;
  showReqColor: boolean = false;

  toAdd: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    color: new FormControl('#a1a1a1ff', Validators.required),
  });

  confirmAddMessageData: ConfirmationMessageInputData = {
    confirmButtonColor: '#169e11ff',
    confirmButtonText: 'Add',
    message: 'Are You Sure Your About To Add This Task',
  };

  //close all messages
  closeMessages() {
    this.showConfirmAddMessage = false;
  }

  manageAddBtn(): void {
    if (this.toAdd.valid) {
      this.showConfirmAddMessage = true;
      this.showReqColor = false;
      this.showReqName = false;
      return;
    }
    if (this.toAdd.get('name')?.invalid) {
      this.showReqName = true;
    }
    if (this.toAdd.get('color')?.invalid) {
      this.showReqColor = true;
    }
  }

  //if clicked add button
  manageAddMessage(isConfirmed: boolean) {
    if (isConfirmed) {
      this.toAddData.emit({
        name: this.toAdd.get('name')?.value ?? '',
        color: this.toAdd.get('color')?.value ?? 'red',
      });
      this.hideThisMessage.emit(false);
    }

    this.closeMessages();
  }
}
