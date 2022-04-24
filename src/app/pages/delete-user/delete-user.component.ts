import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

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

  onDelete = new EventEmitter();

  constructor( private userService:UserService,public dialogRef: MatDialogRef<DeleteUSerComponent>) { }

  ngOnInit(): void {
    const sub = this.userService.getUsers().subscribe(
      r => {
        this.users = r
        this.userService.allUsers = this.users
      }
    )

    this.delUser = this.dialogRef._containerInstance._config.data.user
  }

  deleteUser(){
    this.userService.deleteUser(this.delUser).subscribe()

    this.users = this.users.filter( c => c.id != this.delUser.id)
    this.onDelete.emit(this.users);
  }

}
