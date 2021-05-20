import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersEditComponent } from './players-edit.component';

describe('PlayersEditComponent', () => {
  let component: PlayersEditComponent;
  let fixture: ComponentFixture<PlayersEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
