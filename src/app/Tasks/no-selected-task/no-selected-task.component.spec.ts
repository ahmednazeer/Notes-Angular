import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoSelectedTaskComponent } from './no-selected-task.component';

describe('NoSelectedTaskComponent', () => {
  let component: NoSelectedTaskComponent;
  let fixture: ComponentFixture<NoSelectedTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoSelectedTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoSelectedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
