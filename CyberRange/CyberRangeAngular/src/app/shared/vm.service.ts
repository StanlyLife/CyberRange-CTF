import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VmService {
  private headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`,
  });
  constructor(private http : HttpClient) { }


  private GetVmTemplatesUrl = environment.baseUrl + 'api/vm/getvmtemplates';
  private GetVmInfoFromGame = environment.baseUrl + "api/vm/GetVmInfoFromGameForUser?gameId=";
  private GetVmIpfoFromGame = environment.baseUrl + "api/vm/GetVmIpForGame?gameId=";
  private GetAllVmUrl = environment.baseUrl + "api/vm/GetAllVmInfo";
  private DeleteVmUrl = environment.baseUrl + "api/vm/DeleteVm?name=";
  private KillSwitchUrl = environment.baseUrl + "api/vm/KillSwitch";


  GetVmTemplates() : Observable<any> {
    console.log(this.GetVmTemplatesUrl);
    return this.http.get(this.GetVmTemplatesUrl,{headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  GetAllVm() : Observable<any> {
    return this.http.get(
      this.GetAllVmUrl,
       {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }
  KillSwitch() : Observable<any> {
    return this.http.get(
      this.KillSwitchUrl,
       {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }
  DeleteVm(name:string) : Observable<any> {
    return this.http.get(
      this.DeleteVmUrl + name,
       {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }
  GetVmInfoByGameTask( taskId:number ,gameId:number) : Observable<any> {
    return this.http.get(environment.baseUrl + 
      `api/vm/GetVmInfoOnTaskForUser?taskId=${taskId}&gameId=${gameId}`,
       {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }
  GetVmIpforTask( taskId : number,gameId:number) : Observable<any> {
    return this.http.get(environment.baseUrl + 
      `api/vm/GetVmIpForTask?taskId=${taskId}&gameId=${gameId}`
      , {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }


  GetVmInfoByGame( gameId:number) : Observable<any> {
    return this.http.get(this.GetVmInfoFromGame+gameId, {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }
  GetVmIpfoByGame( gameId:number) : Observable<any> {
    return this.http.get(this.GetVmIpfoFromGame+gameId, {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
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
    return throwError(errorMessage);  
  }

}
