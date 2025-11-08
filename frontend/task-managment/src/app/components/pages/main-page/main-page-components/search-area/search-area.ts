import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { TypeIndicator } from '../type-indicator/type-indicator';
import { FullProject } from '../../../../../interfaces/project/full_project';

@Component({
  selector: 'app-search-area',
  imports: [TypeIndicator],
  templateUrl: './search-area.html',
  styleUrl: './search-area.css',
})
export class SearchArea {
  @Input() projectsData!: FullProject[];
  @Input() latestFiltered: number = 0;
  @Input() searchInput!: string;
  //save curr task here before sending it to edit task page
  @Output() currTask = new EventEmitter();
  shownFirst: boolean = false;

  checkAndMarkShown(): boolean {
    if (!this.shownFirst) {
      {
        this.shownFirst = true;
        return false;
      }
    }
    return true;
  }

  shownFirstFalse(): boolean {
    this.shownFirst = false;
    return false;
  }

  public isFiltered(projectId: number): boolean {
    if (this.latestFiltered === 0) {
      return true;
    }
    let currBinary = 1 << projectId;
    if (currBinary & this.latestFiltered) {
      return true;
    }
    return false;
  }
}
