import { AuthenticationService } from './../../authentication/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private _authService: AuthenticationService, private _router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this._authService.isUserAdmin()) {
      console.log("User is admin");
      return true;
    }
    this._router.navigate(['/forbidden'], { queryParams: { returnUrl: state.url }});
    console.log("User not admin");
    return false;
  }
}
