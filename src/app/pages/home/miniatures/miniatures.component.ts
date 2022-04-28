import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { UserResponse } from '../../../commons/interfaces';

@Component({
  selector: 'app-miniatures',
  templateUrl: './miniatures.component.html',
  styleUrls: ['./miniatures.component.scss'],
})
export class MiniaturesComponent implements OnInit {
  @Input() users: UserResponse[] = []

  usersMarketing: UserResponse[] = [];
  usersDevelopment: UserResponse[] = [];

  constructor() {}

  ngOnInit(): void {
  }

  searchUser(members: UserResponse[],filter:string, value: String): UserResponse[] {
    return members.filter(
      (member) =>
        (member.name.toLowerCase().includes(value.toLowerCase()) ||
        member.email.toLowerCase().includes(value.toLowerCase())) &&
        member.department.toLowerCase() == filter.toLowerCase()
    );
  }

  experience(member:UserResponse):string{
    let actualDate = new Date()
    let userDate  = new Date(member.created.split('T')[0])

    let timeInMilisec = actualDate.getTime() - userDate.getTime()
    let days = Math.ceil(timeInMilisec/(1000*60*60*24))

    if(days <=1) return 'Experienced'
    else if( days >1 && days <=2 ) return 'Advanced'
    else if(days >2 && days <=3) return 'Senior'
    else return 'Expert'
  }

  colorExperience(text:string):string{
    if (text == 'Experienced') return "rgb(18, 102, 74)"
    else if (text == 'Advanced') return "rgb(5, 103, 133)"
    else if (text == 'Senior') return "rgb(146, 27, 146)"
    else return " rgb(247, 161, 2)"
  }
}
