import { catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { gameCreate } from './game-create/game-create.model';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private createGameUrl = environment.baseUrl + "api/game/create";
  private editGameUrl = environment.baseUrl + "api/game/EditGame";
  private getGamesUrl = environment.baseUrl + "api/game/all";
  private getGameUrl = environment.baseUrl + "api/game/GetGame?id=";
  private participateGameUrl = environment.baseUrl + "api/game/participateGame?id=";
  private participateGamePasswordUrl = environment.baseUrl + "api/game/ParticipateGamePassword?id=";
  private getAllParticipatedGamesUrl = environment.baseUrl + "api/game/GetParticipatedGames";
  private hasParticipatedUrl = environment.baseUrl + "api/game/HasParticipated?gameId=";
  private GetAllTasksUrl = environment.baseUrl + "api/game/GetAllTasks";
  private GetAllTasksInGameUrl = environment.baseUrl + "api/game/GetAllTasksForGame?gameId=";
  private GetAllTasksForGameForplayerUrl = environment.baseUrl + "api/game/GetAllTasksForGameForPlayer?gameId=";
  private GetGameInformationUrl = environment.baseUrl + "api/game/GetGeneralGameInfo?gameId="
  private RemoveTaskFromGameUrl = environment.baseUrl + "api/game/RemoveTaskFromGame?gameId="
  private DeleteGameUrl = environment.baseUrl + "api/game/DeleteGame?gameId="
  private ChangeVisibilityUrl = environment.baseUrl + "api/game/UpdateGameVisibility?gameId="
  private FinishGameUrl = environment.baseUrl + "api/game/FinishGame?gameId="
  private GetGameStateInfoUrl = environment.baseUrl + "api/game/GetGameStateInfo?gameId="
  private GetGameStatsInfoForGameUrl = environment.baseUrl + "api/game/GetGameStatsInfoForGame?gameId="
  private headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`,
   });
  constructor(private http : HttpClient) { }

  DeleteGame(gameId: number) : Observable<any> {
    return this.http.get<any>(this.DeleteGameUrl + gameId,
       {headers: this.headers})
      .pipe(catchError(this.handleError));
  }

  FinishGame(gameId: number) : Observable<any> {
    return this.http.get<any>(this.FinishGameUrl + gameId,
       {headers: this.headers})
      .pipe(catchError(this.handleError));
  }
  GetGameStateInfo(gameId: number) : Observable<any> {
    return this.http.get<any>(this.GetGameStateInfoUrl + gameId,
       {headers: this.headers})
      .pipe(catchError(this.handleError));
  }
  GetGameStatsInfoForGame(gameId: number) : Observable<any> {
    return this.http.get<any>(this.GetGameStatsInfoForGameUrl + gameId,
       {headers: this.headers})
      .pipe(catchError(this.handleError));
  }


  GetGameInfo(id: number ) : Observable<gameCreate> {
    var x = this.http.get<gameCreate>(this.GetGameInformationUrl + id, {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
    return x;
  }

  RemoveTaskFromGame(gameId: number, taskId: number ) : Observable<gameCreate> {
    var x = this.http.get<gameCreate>(this.RemoveTaskFromGameUrl + gameId + "&taskId=" + taskId, {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
    return x;
  }
  ChangeVisibility(gameId: number, hidden: boolean ) : Observable<gameCreate> {
    var x = this.http.get<gameCreate>(this.ChangeVisibilityUrl + gameId + "&hidden=" + hidden, {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
    return x;
  }

  CreateGame( model : gameCreate) : Observable<gameCreate> {
    var x = this.http.post<gameCreate>(this.createGameUrl, model, {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
    console.log(x);
    return x;
  }

  GetGames() : Observable<object> {
    var x = this.http.get(this.getGamesUrl, {headers: this.headers})
    .pipe(
      catchError(this.handleError)
    );
    return x;
  }

  GetGame(id : number) : Observable<object> {
    var x = this.http.get(this.getGameUrl + id, {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
      return x;
  } 

  UpdateGame(game : gameCreate) : Observable<object> {
    var x = this.http.post(this.editGameUrl,game, {headers: this.headers})
    .pipe(catchError(this.handleError))
    return x;
  }

  ParticipateGame(gameId : number) : Observable<object> {
    var x = this.http.get(this.participateGameUrl + gameId, {headers: this.headers})
    .pipe(catchError(this.handleError));
    return x;
  }
  ParticipateGamePassword(gameId : number, password: string) : Observable<object> {
    var x = this.http.get(this.participateGamePasswordUrl + gameId + "&password=" +password, {headers: this.headers})
    .pipe(catchError(this.handleError));
    return x;
  }

  GetAllParticipatedGames() : Observable<object> {
    var x = this.http.get(this.getAllParticipatedGamesUrl, {headers: this.headers})
    .pipe(catchError(this.handleError));
    return x;
  }

  HasParticipated(gameId: number) : Observable<object> {
    var x = this.http.get(this.hasParticipatedUrl+gameId, {headers: this.headers}).pipe(catchError(this.handleError));
    return x;
  }

  AddTaskToGame(taskId: number, gameId: number) : Observable<object> {
    var x = this.http.get(environment.baseUrl + `api/game/AddTaskToGame?taskId=${taskId}&gameId=${gameId}`, 
    {headers : this.headers})
    .pipe(catchError(this.handleError));
    console.log(environment.baseUrl + `api/game/AddTaskToGame?taskId=${taskId}&gameId=${gameId}`);
    return x;
  }

  GetAllTasks() : Observable<object> {
    var x = this.http.get(this.GetAllTasksUrl, {headers: this.headers}).pipe(catchError(this.handleError));
    return x;
  }

  GetAllTasksFromGame(gameId : number) : Observable<object> {
    var x = this.http.get(this.GetAllTasksInGameUrl +gameId, {headers: this.headers})
    .pipe(catchError(this.handleError));
    return x;
  }

  GetallTasksForGameForUser(gameId: number): Observable<object> {
    var x = this.http.get(this.GetAllTasksForGameForplayerUrl+gameId, {headers: this.headers})
    .pipe(catchError(this.handleError));
    return x;
  }

  StartTaskForUserForGameForTask(taskId: number, gameId: number) {
    return this.http.get(environment.baseUrl + `api/game/StartTaskForgame?taskId=${taskId}&gameId=${gameId}`, {headers: this.headers})
    pipe(catchError(this.handleError));
  }
  DeliverFlag(taskId: number, gameId: number, flag: string) {
    return this.http.get(environment.baseUrl + `api/game/DeliverFlag?taskId=${taskId}&gameId=${gameId}&flag=${flag}`, {headers: this.headers})
    pipe(catchError(this.handleError));
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
