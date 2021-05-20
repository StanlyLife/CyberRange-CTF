import { catchError } from 'rxjs/operators';
import { error } from 'selenium-webdriver';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`,
  });
  constructor(
    private toastr: ToastrService, 
    private http : HttpClient
    ) { }

  private getUserUrl = environment.baseUrl + "api/user/GetPlayer";
  private UpdateProfileUrl = environment.baseUrl + "api/user/UpdateProfile";
  private UpdateProfilePictureUrl = environment.baseUrl + "api/user/UpdateProfilePicture";
  private UpdateProfileBannerPictureUrl = environment.baseUrl + "api/user/UpdateBanner";
  private ChangeMyUserRoleUrl = environment.baseUrl + "api/user/ChangeMyUserRole?role=";
  private ChangeUserRoleUrl = environment.baseUrl + "api/user/ChangeMyUserRole?role=";
  private GetAllUsersUrl = environment.baseUrl + "api/user/GetAllUsers";
  private UpdateUserAsAdminUrl = environment.baseUrl + "api/user/UpdateUserAsAdmin";
  private GetUserRoleUrl = environment.baseUrl + "api/user/GetUserRole?userId=";
  private DeleteUserUrl = environment.baseUrl + "api/user/DeleteUser?userId=";
  private ActivateUserUrl = environment.baseUrl + "api/user/ActivateUser?userId=";
  private DeactivateUserUrl = environment.baseUrl + "api/user/DeactivateUser?userId=";

  getAllUsers() : Observable<any> {
    return this.http.get(this.GetAllUsersUrl ,{headers: this.headers}).pipe(catchError(this.handleError));
  }
  GetUserRole(id: string) : Observable<any> {
    return this.http.get(this.GetUserRoleUrl + id ,{headers: this.headers}).pipe(catchError(this.handleError));
  }
  DeleteUser(id: string) : Observable<any> {
    return this.http.get(this.DeleteUserUrl + id  ,{headers: this.headers}).pipe(catchError(this.handleError));
  }
  ActivateUser(id: string) : Observable<any> {
    return this.http.get(this.ActivateUserUrl + id  ,{headers: this.headers}).pipe(catchError(this.handleError));
  }
  DeactivateUser(id: string) : Observable<any> {
    return this.http.get(this.DeactivateUser + id  ,{headers: this.headers}).pipe(catchError(this.handleError));
  }
  getUser() : Observable<any> {
    return this.http.get(this.getUserUrl ,{headers: this.headers}).pipe(catchError(this.handleError));
  }
  UpdateUserAsAdmin(profile: any) : Observable<any> {
    return this.http.post(this.UpdateUserAsAdminUrl, profile ,{headers: this.headers}).pipe(catchError(this.handleError));
  }
  UpdateProfile(profile: any) : Observable<any> {
    return this.http.post(this.UpdateProfileUrl, profile ,{headers: this.headers}).pipe(catchError(this.handleError));
  }
  UpdateProfilePicture(url: any) : Observable<any> {
    return this.http.post(this.UpdateProfilePictureUrl, url,{headers: this.headers}).pipe(catchError(this.handleError));
  }
  UpdateProfileBannerPicture(url: any) : Observable<any> {
    return this.http.post(this.UpdateProfileBannerPictureUrl, url,{headers: this.headers}).pipe(catchError(this.handleError));
  }
  ChangeMyUserRole(role: string) : Observable<any> {
    return this.http.get(this.ChangeMyUserRoleUrl + role,{headers: this.headers}).pipe(catchError(this.handleError));
  }
  ChangeUserRole(role: string, email: string) : Observable<any> {
    return this.http.get(this.ChangeUserRoleUrl + role + "&email=" + email,{headers: this.headers}).pipe(catchError(this.handleError));
  }



  private handleError(err) {  
    let errorMessage: string;  
    console.error("ERROR IN GAME SERVICE");
    console.log(err.error);
    console.log(err.error.errorMessage);
    if (err.error instanceof ErrorEvent) {  
      errorMessage = `An error occurred: ${err.error.message}`;
      console.log(errorMessage);
    } else {  
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;  
      console.log(errorMessage);
    }  
    console.error(err);  
    this.toastr.error(errorMessage);
    return throwError(errorMessage);  
  }

}
