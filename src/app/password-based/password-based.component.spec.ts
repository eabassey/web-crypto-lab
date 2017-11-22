import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordBasedComponent } from './password-based.component';

describe('PasswordBasedComponent', () => {
  let component: PasswordBasedComponent;
  let fixture: ComponentFixture<PasswordBasedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordBasedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordBasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
