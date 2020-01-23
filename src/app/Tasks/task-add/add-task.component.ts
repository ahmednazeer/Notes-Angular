import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NotesService} from "../notes.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {


  addNoteForm:FormGroup;
  public imagePath;
  imgURL: any;
  url:any;
  public message: string;



  constructor(private tasksService:NotesService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.addNoteForm=new FormGroup({
      title:new FormControl('',Validators.required),
      //text:new FormControl('',Validators.required),
      date:new FormControl('',Validators.required),
      text:new FormControl('',Validators.required),
      imagePath:new FormControl('')
    });

  }
  onSubmit(){

      this.tasksService.AddTask(this.addNoteForm.value).subscribe(
        (respose)=> {
          console.log(respose);
          //this.tasksService.tasksSubject.next(respose)
        }
      );
    this.router.navigate(['../']);
  }

  onCancel(){
    this.addNoteForm.reset();
    this.router.navigate(['../'],{relativeTo:this.activatedRoute});
  }
  handleFileInput(event) {
    this.imagePath=event.target.result;
    //this.fileToUpload = files.item(0);
    this.addNoteForm.patchValue(
      {
        'imagePath':event.target.value
      }
    )
  }

  preview(files) {
    //this.handleFileInput(ev);
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);

    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.addNoteForm.patchValue(
        {
          'imagePath':this.imagePath
        });
      console.log(reader.result);
    }
  }


  readUrl(event:any) {
    this.handleFileInput(event);
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader> event.target).result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  }
