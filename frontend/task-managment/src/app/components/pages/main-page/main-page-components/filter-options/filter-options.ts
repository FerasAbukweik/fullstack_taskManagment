import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-filter-options',
  imports: [ReactiveFormsModule],
  templateUrl: './filter-options.html',
  styleUrls: ['./filter-options.css'],
})
export class FilterOptions implements OnInit {
  @Input() projectsNames!: Map<number, string>;
  namesKeys: any;
  @Input() prevOptions: number = 0;
  @Output() selected = new EventEmitter<number>();

  chosenOptions!: FormGroup;

  ngOnInit(): void {
    const map: any = {};

    this.projectsNames.forEach((name, projectId) => {
      map[projectId.toString()] = new FormControl(Boolean(this.prevOptions & (1 << projectId)));
    });

    this.chosenOptions = new FormGroup(map);

    this.namesKeys = Array.from(this.projectsNames.keys());
  }

  returnData() {
    let toRet = 0;

    this.projectsNames.forEach((name, projectId) => {
      if (this.chosenOptions.value[projectId.toString()]) {
        toRet |= 1 << projectId;
      }
    });

    this.selected.emit(toRet);
  }
}
