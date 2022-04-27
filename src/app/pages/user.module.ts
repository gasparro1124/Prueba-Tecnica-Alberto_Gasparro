import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersTableComponent } from './home/users-table/users-table.component';
import { MiniaturesComponent } from './home/miniatures/miniatures.component';
import { HomeComponent } from './home/home.component';

import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle'
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AddUSerComponent } from '../modals/add-user/add-user.component';
import { BrowserModule } from '@angular/platform-browser';
import { DeleteUserComponent } from '../modals/delete-user/delete-user.component';


@NgModule({
  declarations: [
    UsersTableComponent,
    MiniaturesComponent,
    HomeComponent,
    AddUSerComponent,
    DeleteUserComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule
  ],
  exports:[
    HomeComponent
  ]
})
export class userModule { }
