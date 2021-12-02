import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubtaskDialogComponent } from './create-subtask-dialog.component';

describe('CreateSubtaskDialogComponent', () => {
  let component: CreateSubtaskDialogComponent;
  let fixture: ComponentFixture<CreateSubtaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSubtaskDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubtaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
