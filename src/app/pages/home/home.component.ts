import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { UserResponse } from '../../commons/interfaces';
import { UserService } from '../../commons/user.service';
import { AddUSerComponent } from '../../modals/add-user/add-user.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public users: UserResponse[] = []
  private subs: Subscription[] = []
  public tableVisibility = true

  constructor(
    private userService: UserService,
    private addUSer: MatDialog
  ){ }

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

  isTableVisible():void{
    this.users = [...this.userService.allUsers]
    this.tableVisibility = true
  }

  isCardVisible():void{
    this.users = [...this.userService.allUsers]
    this.tableVisibility = false
  }

  openDialog():void {
    const ref = this.addUSer.open(AddUSerComponent, {
      width:'60%',
      panelClass: 'custom-dialog-container',
      disableClose: true
    });

    const sub = ref.componentInstance.onAdd.subscribe((data) => {
      this.users = data;
      this.userService.allUsers = data
    });

    ref.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }

}
