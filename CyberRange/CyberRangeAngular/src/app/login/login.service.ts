import { Loginresponse } from './loginresponse.model';
import { Login } from './login.model';
import { environment } from './../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loginUrl = environment.baseUrl + 'api/user/login';
  constructor(private http: HttpClient) { }

  createUser(login: Login): Observable<Login> {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    var x = this.http.post<Login>(this.loginUrl, login, { headers: headers })  
      .pipe(  
        catchError(this.handleError)  
      );
    console.log(x);
    return x;  
  }

  loginUser(body: Login) : Observable<Loginresponse> {
    localStorage.clear();
    return this.http.post<Loginresponse>(this.loginUrl, body);
  }

  private handleError(err) {  
    let errorMessage: string;  
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
    return throwError(errorMessage);  
  }  
}
