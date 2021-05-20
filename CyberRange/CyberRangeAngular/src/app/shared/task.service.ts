import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`,
  });
  constructor(private http : HttpClient) { }
  private UpdateTaskStatusUrl = environment.baseUrl + 'api/task/SetTaskFinished';
  private GetPlayerTaskUrl = environment.baseUrl + 'api/task/GetPlayerTask';
  SetTaskFinished(taskid,gameid) : Observable<any> {
    return this.http.get(this.UpdateTaskStatusUrl + `?taskid=${taskid}`+`&gameid=${gameid}`,{headers: this.headers});
  }
  GetPlayerTask(taskid,gameid) : Observable<any> {
    return this.http.get(this.GetPlayerTaskUrl + `?taskid=${taskid}`+`&gameid=${gameid}`,{headers: this.headers});
  }
}
