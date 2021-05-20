import { ToastrService } from 'ngx-toastr';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {


  private headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`,
  });
  constructor(
    private toastr: ToastrService, 
    private http : HttpClient
    ) { }

  private IsBackendUpUrl = environment.baseUrl + "api/platform/IsBackendUp";
  IsBackendUp() : any {
    return this.http.get(this.IsBackendUpUrl,{headers: this.headers});
  }
}
