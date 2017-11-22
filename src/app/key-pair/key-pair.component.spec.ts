import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyPairComponent } from './key-pair.component';

describe('KeyPairComponent', () => {
  let component: KeyPairComponent;
  let fixture: ComponentFixture<KeyPairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyPairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyPairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
