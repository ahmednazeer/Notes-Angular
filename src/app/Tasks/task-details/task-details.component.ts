import {Component, OnChanges, OnInit} from '@angular/core';
import {NotesService} from "../notes.service";
import {Note} from "../Models/Note";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {SafePipe} from 'safe-pipe';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  task:Note=new Note();//=this.tasksService.selectedTask;
  taskIndex:number;
  isSelected:boolean=false;
  imagePath;
  constructor(private tasksService:NotesService, private activatedRoute:ActivatedRoute, private router:Router, private safe:SafePipe) {
    this.taskIndex=this.activatedRoute.snapshot.params['id'];
    console.log(this.taskIndex);

    /*this.tasksService.getTasks().subscribe(
      (response)=>{
        this.task=response[this.taskIndex];
        this.isSelected=true;
        console.log(response);
      }
    );*/

  }


  ngOnInit() {
    /*this.tasksService.getTasks().subscribe(
      (response)=>{
        this.task=response[this.taskIndex];
        this.isSelected=true;
        console.log(response);
      }
    );*/

    this.activatedRoute.params.subscribe(
      (params:Params)=>{
        this.taskIndex=params['id'];
        //this.task=this.tasksService.selectedTask;

        this.tasksService.getTaskDetails(this.taskIndex).subscribe(
          (data:Note)=>{
            this.task=data;
            console.log(this.task);
          }
        )
        /*this.tasksService.getTasks().subscribe(
          (response)=>{
            this.task=response[this.taskIndex];
            this.imagePath= this.task.imagePath.replace(/\\/g, '/');
            this.isSelected=true;
            //console.log(response);
          }
        );*/
      }
    );



  }

  OnEditTask(){
      this.tasksService.taskSubject.next(this.task);
      this.router.navigate(['edit'],{relativeTo:this.activatedRoute});
  }
  OnDeleteTask(){
      let taskId:number=this.task.id;
      this.tasksService.deleteTask(taskId).subscribe(
        (result)=>{
          console.log(result);
        }
      );
      this.router.navigate(['../'],{relativeTo:this.activatedRoute});
  }

}
