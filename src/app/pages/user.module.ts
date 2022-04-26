import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersTableComponent } from './users-table/users-table.component';
import { MiniaturesComponent } from './miniatures/miniatures.component';
import { HomeComponent } from './home/home.component';

import {MatTableModule} from '@angular/material/table';///////
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle'
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';/////
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input'////////

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AddUSerComponent } from './add-user/add-user.component';
import { BrowserModule } from '@angular/platform-browser';
import { DeleteUSerComponent } from './delete-user/delete-user.component';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [
    UsersTableComponent,
    MiniaturesComponent,
    HomeComponent,
    AddUSerComponent,
    DeleteUSerComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  exports:[
    HomeComponent
  ]
})
export class userModule { }
