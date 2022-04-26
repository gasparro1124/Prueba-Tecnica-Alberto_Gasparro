import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserResponse } from '../interfaces';
import { UserService } from '../user.service';
import { AddUSerComponent } from '../add-user/add-user.component';

import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public users: UserResponse[] = []

  constructor(
    private userService: UserService,
    private addUSer: MatDialog
  ){ }

  private subs: Subscription[] = []

  public tableVisivility = true
  public cardVisivility = false

  ngOnInit(): void {
    const sub = this.userService.getUsers().subscribe(
      r => {
        this.users = [...r]
        this.userService.allUsers = [...this.users]
      }
    )

    this.subs.push(sub)
  }

  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe()
    });
  }

  isTableVisible(){
    this.users = [...this.userService.allUsers]

    this.tableVisivility = true
    this.cardVisivility = false
  }

  isCardVisible(){
    this.users = [...this.userService.allUsers]


    this.tableVisivility = false
    this.cardVisivility = true
  }

  openDialog() {
    const ref = this.addUSer.open(AddUSerComponent, {
      width:'60%',
      panelClass: 'custom-dialog-container',
      disableClose: true
    });

    const sub = ref.componentInstance.onAdd.subscribe((data) => {
      this.users = data;
      this.userService.allUsers = data
      console.log(this.users)
    });

    ref.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }

}
