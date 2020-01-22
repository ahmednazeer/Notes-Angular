import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Note} from "../Models/Note";
import {NotesService} from "../notes.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

  //isEdit:boolean=true;
  task:Note=this.tasksService.selectedTask;
  taskForm:FormGroup;
  taskIndex:number;
  public imagePath;
  imgURL: any;
  url:any;
  public message: string;


  constructor(private tasksService:NotesService, private activatedRoute:ActivatedRoute, private router:Router) {

this.taskForm=new FormGroup({
      title:new FormControl('',Validators.required),
      date:new FormControl('',Validators.required),
      text:new FormControl('',Validators.required),
      imagePath:new FormControl('')
    });




    this.taskIndex=parseInt( this.activatedRoute.snapshot.params['id']);

    this.tasksService.getTaskDetails(this.taskIndex).subscribe(
      (data:Note)=>{
        this.task=data;
this.taskForm.patchValue({
      title:this.task.title,
      text:this.task.text,
      date:this.task.date,

      //imagePath:this.task.imagePath
    });
        //this.taskForm.patchValue({});
//this.url=this.task.imagePath;
        console.log(data);
      }
    );


    console.log(this.taskIndex);
    /*this.tasksService.getTasks().subscribe(
      (response)=>{
        console.log(response)
        this.task=response[this.taskIndex];
        console.log(this.task);
      }
    );*/

  }

  ngOnInit() {}



  onSubmit(){
        if(this.taskForm.value!=null){
          //console.log(this.taskForm.value);
          let id=this.task.id;
          this.tasksService.EditTask({...this.taskForm.value,id}).subscribe(
            (response)=>console.log(response)
          );
          this.router.navigate(['../../'],{relativeTo:this.activatedRoute});
        }
  }

  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader> event.target).result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.activatedRoute});
  }
}
