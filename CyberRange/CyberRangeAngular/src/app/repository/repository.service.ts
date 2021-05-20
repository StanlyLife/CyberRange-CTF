import { Router, RouterStateSnapshot } from '@angular/router';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: HttpClient, private router: Router) { }

  public getData = (route: string) => {
    return this.http.get(this.createCompleteRoute(route), {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      })
    });
  }
 
  private createCompleteRoute = (route: string) => {
    return `${environment.baseUrl}${route}`;
  }

  public NotAuthorized() : void {
    this.router.navigate(['/login']);  
  }
}
