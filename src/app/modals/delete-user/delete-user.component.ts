import { Component, EventEmitter, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

import { UserResponse } from '../../commons/interfaces';
import { UserService } from '../../commons/user.service';


@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DeleteUserComponent implements OnInit {

  delUser!:UserResponse
  users:UserResponse[] = []

  onDelete = new EventEmitter();

  constructor( private userService:UserService,public dialogRef: MatDialogRef<DeleteUserComponent>) { }

  ngOnInit(): void {
    this.users = this.userService.allUsers
    this.delUser = this.dialogRef._containerInstance._config.data.user
  }

  deleteUser(){
    this.userService.deleteUser(this.delUser).subscribe()

    this.users = this.users.filter( c => c.id != this.delUser.id)

    this.onDelete.emit(this.users);
  }

}
