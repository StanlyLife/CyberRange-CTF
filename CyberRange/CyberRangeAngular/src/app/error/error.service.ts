import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class ErrorService implements HttpInterceptor {

  constructor(private router : Router, private activatedRoute: ActivatedRoute) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = this.handleError(error);
        console.error("Intercept error");
        if(error.status == 0){
          var urlStripped = this.router.url.split( '%2F' );
          //If the user is trying to get a vm this error may occur.
          if(urlStripped[2] != undefined && urlStripped[2] == "game"){
            console.log("is game");
          }else {

            console.log("urlStripped");
            console.log(urlStripped);
            if(this.router.url != '/offline' && this.router.url.split('?')[0] != '/offline'){
              this.router.navigate(["/offline"], { queryParams: { returnUrl: this.router.url }});
            }
          }
        }
        return throwError(errorMessage);
      })
    )
  }

  private handleError = (error: HttpErrorResponse) : string => {
    if(error.status === 404) {
      console.log("404: Not found");
      // return this.handleNotFound(error);
    }
    else if(error.status === 400) {
      console.log("400: Bad Request");
      return error.error;
    }
    else if(error.status === 401) {
      console.log("401: Unauthorized");
      this.router.navigate(["/login"]);
      // return this.handleUnauthorized(error);
    }
    else if(error.status === 403) {
      console.log("403: Forbidden");
      return this.handleForbidden(error);
    }
  }
  private handleForbidden = (error: HttpErrorResponse) => {
    this.router.navigate(["/forbidden"], { queryParams: { returnUrl: this.router.url }});
    console.log("FORBIDDEN");
    return "Forbidden";
  }

}
