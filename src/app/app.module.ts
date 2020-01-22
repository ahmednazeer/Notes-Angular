import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TasksListComponent } from './Tasks/tasks-list/tasks-list.component';
import { NoteItemComponent } from './Tasks/tasks-list/note-item/note-item.component';
import { TaskDetailsComponent } from './Tasks/task-details/task-details.component';
import {HttpClientModule} from "@angular/common/http";
import {NotesService} from "./Tasks/notes.service";
import { TaskEditComponent } from './Tasks/task-edit/task-edit.component';
import {AppRoutingModule} from "./AppRoutingModule";
import {TasksComponent} from "./Tasks/tasks.component";
import {ReactiveFormsModule} from "@angular/forms";
import { NoSelectedTaskComponent } from './tasks/no-selected-task/no-selected-task.component';
import { AddTaskComponent } from './Tasks/task-add/add-task.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {SafePipe, SafePipeModule} from 'safe-pipe';
import {AlarmService} from './Tasks/alarm.service';

@NgModule({
  declarations: [
    AppComponent,
    TasksListComponent,
    NoteItemComponent,
    TaskDetailsComponent,
    TasksComponent,
    TaskEditComponent,
    NoSelectedTaskComponent,
    AddTaskComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SafePipeModule
  ],
  providers: [
    NotesService,
    AlarmService,
    SafePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {


}

