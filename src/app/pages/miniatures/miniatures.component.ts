import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { UserResponse } from '../interfaces';
import { UserService } from '../user.service';
import { userModule } from '../user.module';

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
  }


  searchUser(members: UserResponse[],filter:string, value: String): UserResponse[] {
    return members.filter(
      (member) =>
        (member.name.toLowerCase().includes(value.toLowerCase()) ||
        member.email.toLowerCase().includes(value.toLowerCase())) && member.department.toLowerCase() == filter.toLowerCase()
    );
  }

  experience(member:UserResponse):string{

    let actualDate = new Date()
    let userDate  = new Date(member.created.split('T')[0])

    let timeInMilisec = actualDate.getTime() - userDate.getTime()
    let days = Math.ceil(timeInMilisec/(1000*60*60*24))

    if(days <=1)
      return 'Experienced'
    else if( days >1 && days <=2 )
      return 'Advanced'
    else if(days >2 && days <=3)
      return 'Senior'
    else
      return 'Expert'
  }
}
