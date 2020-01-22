
import {Time} from '@angular/common';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AlarmNote} from './Models/AlarmNote';
import {NotesService} from './notes.service';
@Injectable()
export class AlarmService {
  AlarmSubject: Subject<any> = new Subject<any>();
  AlarmIndex:number=0;
  TaskAlarmArray:AlarmNote[]=[];
  constructor(private tasksService:NotesService){

    /*this.AlarmSubject.subscribe(
      data=>{
        if(data=='done'){
          if(this.AlarmIndex<this.TaskAlarmArray.length-1){
            ++this.AlarmIndex;
            console.log(this.TaskAlarmArray[this.AlarmIndex].time.getTime()-new Date().getTime());
            this.runAlarm({time: this.TaskAlarmArray[this.AlarmIndex].time.getTime()
                -new Date().getTime(),id:this.TaskAlarmArray[this.AlarmIndex].taskId});
          }
        }
      }
    )*/
  }

  runAlarm(alarm_task:{time:number,id:number}){
    console.log(alarm_task.time);
    setTimeout(() => {
      alert('Wake Up!');
      this.AlarmSubject.next('done');
      //this.tasksService.changeAlarmStatus(alarm_task.id);
    }, alarm_task.time);
    //milsecond=time.to
  }

  /*handleAlarms(TaskAlarmArray:AlarmNote[]){
    this.TaskAlarmArray=TaskAlarmArray;
    if(TaskAlarmArray.length>0){
      this.runAlarm({time:TaskAlarmArray[this.AlarmIndex].time.getTime()-new Date().getTime()
        ,id:TaskAlarmArray[this.AlarmIndex].taskId});

    }

  }*/

}
