import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {  Subscription } from 'rxjs';

import { UserResponse } from '../interfaces';
import { UserService } from '../user.service';


@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUSerComponent implements OnInit {

  delUser!:UserResponse
  users:UserResponse[] = []
  subs:Subscription[]=[]

  onDelete = new EventEmitter();

  constructor( private userService:UserService,public dialogRef: MatDialogRef<DeleteUSerComponent>) { }

  ngOnInit(): void {
    const sub = this.userService.getUsers().subscribe(
      r => {
        this.users = [...r]
        this.userService.allUsers = [...this.users]
      }
    )

    this.delUser = this.dialogRef._containerInstance._config.data.user

    this.subs.push(sub)
  }

  deleteUser(){
    this.userService.deleteUser(this.delUser).subscribe()

    this.users = this.users.filter( c => c.id != this.delUser.id)

    this.subs.forEach(e => e.unsubscribe())
    this.userService.allUsers = [...this.users]
    this.onDelete.emit(this.users);
  }

}
