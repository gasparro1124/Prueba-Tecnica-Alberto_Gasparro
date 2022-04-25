import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { UserResponse } from '../interfaces';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUSerComponent implements OnInit {

  userForm!:FormGroup
  newUser!:UserResponse
  users:UserResponse[] = []

  onAdd = new EventEmitter();

  constructor(private fb: FormBuilder, private userService:UserService) { }

  ngOnInit(): void {
    const sub = this.userService.getUsers().subscribe(
      r => {
        this.users = [...r]
        this.userService.allUsers = [...this.users]
      }
    )

    this.userForm = this.fb.group({
      name:['', Validators.required],
      email: ['',[ Validators.required, Validators.email]],
      department:['']
    })
  }

  addUser(){
    if(this.userForm.valid){
      this.newUser = this.userForm.value
      this.newUser.created = new Date().toISOString().slice(0, 19)

      this.userService.addUser(this.newUser).subscribe(
        r => {
          const fake = this.users
          fake.push(r)
          this.users = [...fake]
        }
      )

      this.userService.allUsers = [...this.users]
      this.onAdd.emit(this.users);

    }else{
      alert('campo invalido')
    }
  }

}
