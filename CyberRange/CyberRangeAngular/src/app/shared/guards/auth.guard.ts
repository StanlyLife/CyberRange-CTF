import { AuthenticationService } from './../../authentication/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService : AuthenticationService, private router : Router) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      console.log("called authguard");
    if(this.authService.isUserAuthenticated()){
      console.log("AuthGuard: IsAuthenticated!");
      return true;
    }

    this.router.navigate(['/login'],{queryParams: {returnUrl: state.url}});
    return false;
  }
  
}
