import { GameService } from './../../admin/game/game.service';
import { GameParticipateModalElementComponent } from './../../Player/game/game-participate-modal-element/game-participate-modal-element.component';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GameParticipantGuard implements CanActivate {
  constructor(
  private gs: GameService,
  private router: Router,
  private toastr: ToastrService,
  private activatedRoute: ActivatedRoute,
  ){}
  private gameId : number = 0;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.gameId = +next.url[3]["path"];
    this.gs.HasParticipated(this.gameId).subscribe(res => {
      console.log("Participant guard res");
      console.log(res);
      if(res+"" == "true") {
        return true;
      }else {
        this.toastr.warning("You are not participated in this game!");
        this.router.navigate(['/player/game']);
      }
    }, (error) => {
      this.toastr.error("Unable to check if you have participated in the game");
      this.router.navigate(['/player/game']);
      console.error(error);
    });
    return true;
  }
}
