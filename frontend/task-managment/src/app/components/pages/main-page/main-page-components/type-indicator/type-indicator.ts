import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-type-indicator',
  imports: [],
  templateUrl: './type-indicator.html',
  styleUrl: './type-indicator.css'
})
export class TypeIndicator {
  @Input() projectColor! : string;
}
