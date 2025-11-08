import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { ConfirmationMessage } from '../../../../shared-components/confirmation-message/confirmation-message';
import { FormsModule } from '@angular/forms';
import { ConfirmationMessageInputData } from '../../../../components-interfaces/confirmation-message-input-data';

@Component({
  selector: 'app-edit-discription',
  imports: [FormsModule, ConfirmationMessage],
  templateUrl: './edit-discription.html',
  styleUrl: './edit-discription.css',
})
export class EditDiscription {
  showConfirmEditMessage: boolean = false;
  confirmEditMessageData: ConfirmationMessageInputData = {
    confirmButtonColor: '#169e11ff',
    confirmButtonText: 'edit',
    message: 'Your About To Edit Description',
  };
  @Input() description!: string;
  @Output() outDescription = new EventEmitter<string>();
  @Output() hideThisMessage = new EventEmitter<boolean>();

  manageEditMessage(isConfirmed: boolean): void {
    if (isConfirmed) {
      this.outDescription.emit(this.description);
      this.hideThisMessage.emit(true);
    }
    this.showConfirmEditMessage = false;
  }
}
