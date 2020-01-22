import {Component, Input, OnInit} from '@angular/core';
import {Note} from "../../Models/Note";

import {NotesService} from "../../notes.service";

@Component({
  selector: 'app-task-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css']
})
export class NoteItemComponent implements OnInit {
  @Input() noteInfo:Note;
  constructor(private tasksService:NotesService) { }

  ngOnInit() {
  }

  OnTaskClicked(task:Note){
      this.tasksService.taskSubject.next(task);
      //console.log(("clicked"));
  }

}
