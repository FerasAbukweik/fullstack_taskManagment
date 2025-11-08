import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDiscription } from './edit-discription';

describe('EditDiscription', () => {
  let component: EditDiscription;
  let fixture: ComponentFixture<EditDiscription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDiscription]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDiscription);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
