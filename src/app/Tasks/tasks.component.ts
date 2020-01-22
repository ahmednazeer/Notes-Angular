import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NotesService} from "./notes.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor( private router:Router,private activatedRout:ActivatedRoute,private tasksService:NotesService) { }

  ngOnInit() {
  }
  OnAddTask(){
    this.router.navigate(['/tasks/new']);
  }
}
