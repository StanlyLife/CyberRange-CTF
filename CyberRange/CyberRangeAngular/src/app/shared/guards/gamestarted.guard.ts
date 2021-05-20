import { GameService } from './../../admin/game/game.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GamestartedGuard implements CanActivate {
  constructor(
    private gs: GameService,
     private router: Router,
     private toastr: ToastrService,
     private activatedRoute: ActivatedRoute,
     ){}
    private gameId : number = 0;

  canActivate(
    next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot,
    ) {
    this.gameId = +next.url[3]["path"];
    this.gs.GetGame(this.gameId).subscribe(res => {
      if(res["State"] != (null || "ready")) {
        this.toastr.info("The game has started. Good luck!");
        return true;
      }else {
        this.toastr.warning("Game id " + this.gameId +" has not started! Wait until the game starts");
        this.router.navigate(['/player/game']);
      }
    }, (error) => {
      this.toastr.error("Unable to check if game has started");
      this.router.navigate(['/player/game']);
      console.error(error);
    });
    return true;

  }
  
}
