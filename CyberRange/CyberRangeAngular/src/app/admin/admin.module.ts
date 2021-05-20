import { SortPipe } from './../pipes/sort.pipe';
import { PlayerSearchResultComponent } from './dashboard/user-dashboard/player-search-result/player-search-result.component';
import { EditSearchResultComponent } from './dashboard/user-dashboard/edit-search-result/edit-search-result.component';
import { GameTaskDescriptionElementComponent } from './../Player/game/game-task-description-element/game-task-description-element.component';
import { PlayerModule } from './../Player/player.module';
import { AdminProfileHeaderComponent } from './admin-profile-header/admin-profile-header.component';
import { PipesModule } from './../pipes/pipes.module';
import { ValueArrayPipe } from './../pipes/value-array.pipe';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GameDashboardComponent } from './game/game-dashboard/game-dashboard.component';
import { GameEditComponent } from './game/game-edit/game-edit.component';
import { GameCreateComponent } from './game/game-create/game-create.component';
import { TaskDashboardComponent } from './task/task-dashboard/task-dashboard.component';
import { TaskCreateComponent } from './task/task-create/task-create.component';
import { TaskEditComponent } from './task/task-edit/task-edit.component';
import { PlayersComponent } from './player/players/players.component';
import { PlayersCreateComponent } from './player/players-create/players-create.component';
import { PlayersEditComponent } from './player/players-edit/players-edit.component';
import { GameElementComponent } from './game-element/game-element.component';
import { GameTaskElementComponent } from './game-task-element/game-task-element.component';
import { PlayerModalComponent } from './player/players/player-modal/player-modal.component';
import { AdminGameTaskDescriptionComponent } from './task/admin-game-task-description/admin-game-task-description.component';
import { RegistrationCodeElementComponent } from './registration-code-element/registration-code-element.component';
import { VmDashBoardComponent } from './vm-dash-board/vm-dash-board.component';
import { VmElementComponent } from './vm-dash-board/vm-element/vm-element.component';
import { VmInfoModalComponent } from './vm-dash-board/vm-info-modal/vm-info-modal.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    GameDashboardComponent,
    GameEditComponent,
    GameCreateComponent,
    TaskDashboardComponent,
    TaskCreateComponent,
    TaskEditComponent,
    PlayersComponent,
    PlayersCreateComponent,
    PlayersEditComponent,
    GameElementComponent,
    GameTaskElementComponent,
    PlayerSearchResultComponent,
    EditSearchResultComponent,
    PlayerModalComponent,
    AdminProfileHeaderComponent,
    AdminGameTaskDescriptionComponent,
    RegistrationCodeElementComponent,
    VmDashBoardComponent,
    VmElementComponent,
    VmInfoModalComponent,
    UserDashboardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    PipesModule,
    RouterModule.forChild([
      { path: 'admin', component: DashboardComponent },
      //Game
      { path: 'admin/game', component: GameDashboardComponent },
      { path: 'admin/game/edit/:id', component: GameEditComponent },
      { path: 'admin/game/create', component: GameCreateComponent },
      //Task
      { path: 'admin/task', component: TaskDashboardComponent },
      { path: 'admin/task/edit/:id', component: TaskEditComponent },
      { path: 'admin/task/create', component: TaskCreateComponent },
      //Player
      { path: 'admin/players', component: PlayersComponent },
      { path: 'admin/players/create', component: PlayersEditComponent },
      { path: 'admin/players/edit/:id', component: PlayersCreateComponent },

    ]),
  ],
  providers: [ValueArrayPipe, SortPipe],
})
export class AdminModule {

  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const element = createCustomElement(GameElementComponent, {
      injector: this.injector
    });
    customElements.define('app-game-element', element);
  }

}
