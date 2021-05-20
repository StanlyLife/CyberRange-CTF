import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersCreateComponent } from './players-create.component';

describe('PlayersCreateComponent', () => {
  let component: PlayersCreateComponent;
  let fixture: ComponentFixture<PlayersCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
