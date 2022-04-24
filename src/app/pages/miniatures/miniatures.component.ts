import { Component, OnInit, Input } from '@angular/core';
import { of, Observable } from 'rxjs';
import { UserResponse } from '../interfaces';

@Component({
  selector: 'app-miniatures',
  templateUrl: './miniatures.component.html',
  styleUrls: ['./miniatures.component.scss']
})
export class MiniaturesComponent implements OnInit {

  @Input() users:UserResponse[] = []

  usersMarketing:UserResponse[]= []
  usersDevelopment:UserResponse[]= []

  usersMarketingObserver:Observable<UserResponse[]>=of(this.users)
  usersDevelopmentObserver:Observable<UserResponse[]>=of(this.users)

  constructor() { }

  ngOnInit(): void {

    this.usersMarketingObserver.subscribe( r => {
      console.log(r)
      r.filter( user => {
        if(user.department.toLowerCase() == 'marketing')
          this.usersMarketing.push(user)
      })
    })

    this.usersDevelopmentObserver.subscribe( r => {
      r.filter( user => {
        if(user.department.toLowerCase() == 'development')
          this.usersMarketing.push(user)
      })
    })

  }

  searchUser(members:UserResponse[], value:String): UserResponse[] {
    return members.filter(
      member => member.name.toLowerCase().includes(value.toLowerCase()) ||  member.email.toLowerCase().includes(value.toLowerCase())
    )
  }

}
