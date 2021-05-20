import { TaskModel } from './task-model';
import { catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  public createTaskUrl = environment.baseUrl + "api/Task/CreateTask";
  public editTaskUrl = environment.baseUrl + "api/task/EditTask";
  public getTasksUrl = environment.baseUrl + "api/task/GetAllTask";
  public getTaskUrl = environment.baseUrl + "api/task/GetTask?id=";
  public DeleteTaskUrl = environment.baseUrl + "api/task/DeleteTask?taskId=";
  public headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
   });

  constructor(private http: HttpClient) { }

  DeleteTask(taskId : number) : Observable<any> {
    return this.http.get<TaskModel>(this.DeleteTaskUrl + taskId, {headers: this.headers})
    .pipe(catchError(this.handleError));
  }
  CreateTask(model : TaskModel) : Observable<TaskModel> {
    console.log("CREATE TASK SERVICE");
    var x = this.http.post<TaskModel>(this.createTaskUrl, model, {headers: this.headers})
    .pipe(catchError(this.handleError));
    return x;
  }
  EditTask(model : TaskModel) : Observable<TaskModel> {
    console.log("EDIT TASK SERVICE");
    var x = this.http.post<TaskModel>(this.editTaskUrl, model, {headers: this.headers})
    .pipe(catchError(this.handleError));
    return x;
  }
  GetTask(id: number) : Observable<TaskModel> {
    var x = this.http.get<TaskModel>(this.getTaskUrl+ id, {headers: this.headers})
    .pipe(catchError(this.handleError))
    return x;
  }
  GetAllTasks() : Observable<object> {
    var x = this.http.get<TaskModel>(this.getTasksUrl, {headers: this.headers})
    .pipe(catchError(this.handleError))
    return x;
  }


  private handleError(err) {  
    let errorMessage: string;  
    console.error("ERROR IN TASK SERVICE");
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
