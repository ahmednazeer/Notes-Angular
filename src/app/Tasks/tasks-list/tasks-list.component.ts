import { Component, OnInit } from '@angular/core';
import {NotesService} from "../notes.service";
import {Note} from "../Models/Note";
import {ActivatedRoute, Router} from "@angular/router";
import {AlarmService} from '../alarm.service';
import {AlarmNote} from '../Models/AlarmNote';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {
  notes:Note []=[];
  TaskAlarmArray:{time:Date,taskId:number}[]=[];
  AlarmIndex=0;
  constructor(private tasksService:NotesService
              ,private router:Router
              ,private activatedRout:ActivatedRoute
              ,private alarmService:AlarmService) {
    this.router.events.subscribe((val) =>{
      this.initNotes();

    }
      );



    //this.handleAlarms();

  }

  ngOnInit() {
    /*this.tasksService.getTasks().subscribe(
      (response)=>{
        console.log(response)
        this.tasks=response;
        for(let i=0;i<this.tasks.length;i++){
          if(new Date(this.tasks[i].date)>new Date()){
            let alarm=new Date( this.tasks[i].date);
            let taskId=this.tasks[i].id;
            this.TaskAlarmArray.push({time: alarm,taskId});
          }
        }
        //Handle Alarms
        this.alarmService.handleAlarms(this.TaskAlarmArray);


      }
    );*/

    this.alarmService.AlarmSubject.subscribe(
      data=>{
        if(data=='done'){
          if(this.AlarmIndex<this.TaskAlarmArray.length-1){
            ++this.AlarmIndex;
            console.log(this.TaskAlarmArray[this.AlarmIndex].time.getTime()-new Date().getTime());
            this.alarmService.runAlarm({time: (this.TaskAlarmArray[this.AlarmIndex].time.getTime()
                -new Date().getTime()),id:this.TaskAlarmArray[this.AlarmIndex].taskId});
          }
        }
      }
    );
    this.runAll();


  }

  async initNotes(){
    this.tasksService.getTasks().subscribe(
      (response)=>{
        console.log(response)
        this.notes=response;
        for(let i=0; i<this.notes.length; i++){
          if(new Date(this.notes[i].date)>new Date()){
            let alarm=new Date( this.notes[i].date);
            let taskId=this.notes[i].id;
            if( !this.TaskAlarmArray.find(note=>note.taskId==taskId))
                  this.TaskAlarmArray.unshift({time: alarm,taskId});
          }
        }
        //Handle Alarms
        this.handleAlarms();


      }
    );

    /*this.alarmService.runAlarm(new Date(this.TaskAlarmArray[this.index].time).getTime()-new Date().getTime());
    this.alarmService.AlarmSubject.subscribe(
      data=>{
        if(data=='done'){
          if(this.index<this.timeArray.length-1){
            ++this.index;
            this.alarmService.runAlarm(this.timeArray[this.index].getTime()-new Date().getTime());
          }
        }
      }
    )*/

  }

async runAll(){
    await this.initNotes();
  //this.handleAlarms();


}

  handleAlarms(){
    //TaskAlarmArray=this.TaskAlarmArray;
    console.log(this.TaskAlarmArray);
    console.log(this.TaskAlarmArray[this.AlarmIndex].time.getTime()-new Date().getTime()+"============================= milisecond");
    if(this.TaskAlarmArray.length>0){
      //con
      this.alarmService.runAlarm({time:this.TaskAlarmArray[this.AlarmIndex].time.getTime()-new Date().getTime()
        ,id:this.TaskAlarmArray[this.AlarmIndex].taskId});

    }
  }
  OnTaskClicked(task: Note, index) {
    //console.log(this.tasks[index]);
    //this.tasksService.taskSubject.next(this.tasks[index]);
    this.tasksService.selectedTask=task;
    this.router.navigate([task.id],{relativeTo:this.activatedRout});
  }


}
