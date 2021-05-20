import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationCodeElementComponent } from './registration-code-element.component';

describe('RegistrationCodeElementComponent', () => {
  let component: RegistrationCodeElementComponent;
  let fixture: ComponentFixture<RegistrationCodeElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationCodeElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationCodeElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
