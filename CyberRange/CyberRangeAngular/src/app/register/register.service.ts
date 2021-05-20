import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Observable, throwError, of } from 'rxjs';  
import { catchError, map } from 'rxjs/operators';  
import { Register } from './register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private registerUrl = environment.baseUrl + "api/User/RegisterUser"
  private AddRegistrationCodeUrl = environment.baseUrl + "api/User/AddRegistrationCodes"
  private UpdateRegistrationModelUrl = environment.baseUrl + "api/User/UpdateRegistrationModel"
  private GetAllRegistrationCodesUrl = environment.baseUrl + "api/User/GetAllRegistrationCodes"
  private DeleteRegistrationCodeUrl = environment.baseUrl + "api/User/DeleteRegistrationCode?code="

  constructor(private http: HttpClient) { }
  private AuthHeader = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`,
  });

  RegisterUser(register: Register): Observable<unknown> {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.post<Register>(this.registerUrl, register, { headers: headers })
      // .pipe(catchError((err) => {
      //   console.log("Catching error");
      //   console.log(err);
      //   return throwError("Something happened");
      // }));
  }
  AddRegisterCode(RegistrationCodesModel: any): Observable<unknown> {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.post<Register>(this.AddRegistrationCodeUrl, RegistrationCodesModel, { headers: this.AuthHeader })  .pipe(catchError(this.handleError));
  }
  UpdateRegistrationModel(RegistrationCodesModel: any): Observable<unknown> {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.post<Register>(this.UpdateRegistrationModelUrl, RegistrationCodesModel, { headers: this.AuthHeader })  .pipe(catchError(this.handleError));
  }
  GetAllRegistrationCodes(): Observable<unknown> {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.get<Register>(this.GetAllRegistrationCodesUrl, { headers: this.AuthHeader })  .pipe(catchError(this.handleError));
  }
  DeleteRegistrationCode(code: string): Observable<unknown> {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.get<Register>(this.DeleteRegistrationCodeUrl+code, { headers: this.AuthHeader })  .pipe(catchError(this.handleError));
  }
  private handleError(err) {  
    let errorMessage: string;  
    if (err.error instanceof ErrorEvent) {  
      errorMessage = `An error occurred: ${err.error.message}`;
      console.log(errorMessage);
    } else {  
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;  
      console.log(errorMessage);
    }  
    console.error(err);  
    return err;  
  }

  private initializeRegister(): Register {  
    return {  
      Email: null,  
      FirstName: null,  
      LastName: null,  
      UserName: null,  
      Password: null,  
      ConfirmPassword: null,  
      RegistrationCodeUsed: null 
    };  
  }  
}
