import { ToastrService } from 'ngx-toastr';
import { PlatformService } from './../platform.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatformGuard implements CanActivate {
  
  /**
   *
   */
  constructor(
    private router: Router,
    private ps: PlatformService,
    private toastr: ToastrService
    ) {
    
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
      console.log("called authguard");
      this.ps.IsBackendUp()
      if(this.ps.IsBackendUp() != null){
        this.toastr.success("Backend is up");
        return true;
      }
  
      this.router.navigate(['/'],{queryParams: {returnUrl: state.url}});
      return false;
  }
  

}
