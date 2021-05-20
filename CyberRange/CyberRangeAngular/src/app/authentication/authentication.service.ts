import { environment } from './../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Loginresponse } from './../login/loginresponse.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _authChangeSub = new Subject<boolean>()
  public authChanged = this._authChangeSub.asObservable();
  public userIsAdmin = this._authChangeSub.asObservable();

  private getUserUrl = environment.baseUrl + "api/User/GetPlayer"; 
  constructor(
    private http: HttpClient,
    private jwtHelper : JwtHelperService,
    private router : Router
    ) { }

  private token = localStorage.getItem("token");
  private headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`,
   });

  sendAuthStateChangeNotification(isAuthenticated: boolean) : void {
    this._authChangeSub.next(isAuthenticated);
  }

  public isUserAuthenticated = (): boolean => {
    return this.token && !this.jwtHelper.isTokenExpired(this.token);
  }

  public isUserAdmin = (): boolean => {
    const decodedToken = this.jwtHelper.decodeToken(this.token);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    return role === 'Admin';
  }

  public logout = () => {
    this.router.navigate(["/login"]);
    localStorage.removeItem("token");
    // localStorage.clear();
    this.sendAuthStateChangeNotification(false);
    console.log("logout");
  }

  public getUser = () => {
    var x = this.http.get(this.getUserUrl, {headers: this.headers})
    .pipe();
    return x;
  }

  private handleUnauthorized = (error: HttpErrorResponse) => {
    if(this.router.url === '/login') {
      return 'Authentication failed. Wrong Username or Password';
    }
    else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url }});
      return error.message;
    }
  }

}
