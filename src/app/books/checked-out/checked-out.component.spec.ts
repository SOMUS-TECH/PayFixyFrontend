import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckedOutComponent } from './checked-out.component';

describe('CheckedOutComponent', () => {
  let component: CheckedOutComponent;
  let fixture: ComponentFixture<CheckedOutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckedOutComponent]
    });
    fixture = TestBed.createComponent(CheckedOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
