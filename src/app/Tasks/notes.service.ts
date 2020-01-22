import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Note} from "./Models/Note";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  tasks:Note[];
  selectedTask:Note;
  baseUrl='http://localhost:60077/api/notes/';
  taskSubject:Subject<Note>=new Subject<Note>();
  tasksSubject:Subject<Note[]>=new Subject<Note[]>();
  constructor(private httpClient:HttpClient) { }

   getTasks(){
    let tasks:Note[];
    let header=new HttpHeaders({
      'Access-Control-Allow-Origin':'AllowMyOrigin'
    });
    return  this.httpClient.get<any[]>(this.baseUrl+"list",{headers:header})

  }

  getTaskDetails(taskId:number){
    return this.httpClient.get(this.baseUrl+'details/'+taskId);
  }

  deleteTask( taskId:number){
    //this.httpClient.
    console.log(taskId);
    return  this.httpClient.delete(this.baseUrl+'remove/'+taskId);
  }

  EditTask(task:Note){
      return  this.httpClient.put(this.baseUrl+'update',task);
  }

  AddTask(task:Note){
    return this.httpClient.post(this.baseUrl+'add',task);
  }

  changeAlarmStatus(noteId:number){
      this.httpClient.put(this.baseUrl+'ChangeStatus/'+noteId,null);
  }

}
