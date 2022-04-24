import { Component, Input, OnInit } from '@angular/core';

import { DeleteUSerComponent } from '../delete-user/delete-user.component';
import { UserResponse } from '../interfaces';
import { UserService } from '../user.service';

import {MatDialog} from '@angular/material/dialog';



@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  @Input() users: UserResponse[] = []

  constructor(private userService: UserService, private deleteUser: MatDialog) { }

  ngOnInit(): void {
  }

  //displayedColumns: string[] = ['NAME', 'E-MAIL', 'DEPARTMENT', 'OPTIONS'];

 openDialog(user:UserResponse) {

    const ref = this.deleteUser.open(DeleteUSerComponent, {
      width:'60%',
      disableClose:true,
      data:{
        user:user
      }
    });

    const sub = ref.componentInstance.onDelete.subscribe((data) => {
      this.users = data;
    });

    ref.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }
}
