import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { UserResponse } from '../interfaces';
import { UserService } from '../user.service';

@Component({
  selector: 'app-miniatures',
  templateUrl: './miniatures.component.html',
  styleUrls: ['./miniatures.component.scss'],
})
export class MiniaturesComponent implements OnInit {
  @Input() users: UserResponse[] = []

  usersMarketing: UserResponse[] = [];
  usersDevelopment: UserResponse[] = [];

  constructor(private userService:UserService) {}

  ngOnInit(): void {
    // this.users.filter((user) => {
    //   if (user.department.toLowerCase() == 'marketing')
    //     this.usersMarketing.push(user);
    // });

    // this.users.filter((user) => {
    //   if (user.department.toLowerCase() == 'development')
    //     this.usersDevelopment.push(user);
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.usersMarketing = [];
    this.usersDevelopment = [];

    console.log(changes)
    changes['users'].currentValue.filter((user:UserResponse) => {
      if (user.department.toLowerCase() == 'marketing')
        this.usersMarketing.push(user);
        this.experience(user)
    });

    changes['users'].currentValue.filter((user:UserResponse) => {
      if (user.department.toLowerCase() == 'development')
        this.usersDevelopment.push(user);
    });
  }

  searchUser(members: UserResponse[], value: String): UserResponse[] {
    return members.filter(
      (member) =>
        member.name.toLowerCase().includes(value.toLowerCase()) ||
        member.email.toLowerCase().includes(value.toLowerCase())
    );
  }

  experience(member:UserResponse){

    let actualDate = new Date()
    let userDate  = new Date(member.created.split('T')[0])

    let timeInMilisec = actualDate.getTime() - userDate.getTime()
    let days = Math.ceil(timeInMilisec/(1000*60*60*24))

    return days
  }
}
