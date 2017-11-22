import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleKeyComponent } from './single-key.component';

describe('SingleKeyComponent', () => {
  let component: SingleKeyComponent;
  let fixture: ComponentFixture<SingleKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
