import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LyImageCropperModule } from '@alyle/ui/image-cropper';
import { CountDownHourPipe } from './../pipes/count-down-hour.pipe';
import { CountDownPipe } from './../pipes/count-down.pipe';
import { GamestartedGuard } from './../shared/guards/gamestarted.guard';
import { GameTaskElementComponent } from './game/game-task-element/game-task-element.component';
import { PipesModule } from './../pipes/pipes.module';
import { ValueArrayPipe } from './../pipes/value-array.pipe';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileheaderComponent } from './profileheader/profileheader.component';
import { GameComponent } from './game/game/game.component';
import { TaskComponent } from './task/task.component';
import { GameElementComponent } from './game/game-element/game-element.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { GamePlayComponent } from './game/game-play/game-play.component';
import { GameTaskFlagElementComponent } from './game/game-task-flag-element/game-task-flag-element.component';
import { GameTaskDescriptionElementComponent } from './game/game-task-description-element/game-task-description-element.component';
import { GameVmElementComponent } from './game/game-vm-element/game-vm-element.component';
import { LySliderModule } from '@alyle/ui/slider';
import { LyIconModule } from '@alyle/ui/icon';
import { GameParticipateModalElementComponent } from './game/game-participate-modal-element/game-participate-modal-element.component';
import { StatisticsElementComponent } from './statistics-element/statistics-element.component';
import { GameParticipantGuard } from '../shared/guards/game-participant.guard';
import { GamePlayStatsComponent } from './game/game-play/game-play-stats/game-play-stats.component';
import { PlayerStatsComponentComponent } from './game/game-play/game-play-stats/player-stats-component/player-stats-component.component';
@NgModule({
  declarations: [
    DashboardComponent,
    ProfileheaderComponent,
    GameComponent,
    TaskComponent,
    GameElementComponent,
    GameTaskElementComponent,
    EditProfileComponent,
    GamePlayComponent,
    GameTaskFlagElementComponent,
    GameTaskDescriptionElementComponent,
    GameVmElementComponent,
    GameParticipateModalElementComponent,
    StatisticsElementComponent,
    GamePlayStatsComponent,
    PlayerStatsComponentComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    LyImageCropperModule,
    LySliderModule,
    LyIconModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'player', component: DashboardComponent },
      { path: 'player/game', component: GameComponent },
      { path: 'player/game/play/:id', component: GamePlayComponent, canActivate: [GamestartedGuard, GameParticipantGuard] },
      { path: 'player/game/task', component: TaskComponent },
      { path: 'player/edit', component: EditProfileComponent },
    ]),
  ],
  providers: [ValueArrayPipe, CountDownPipe, DatePipe, CountDownHourPipe],
})
export class PlayerModule {}
