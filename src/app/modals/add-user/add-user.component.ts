import { Component, EventEmitter, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../commons/user.service';
import { UserResponse, emptyUser } from '../../commons/interfaces';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AddUserComponent implements OnInit {

  userForm: FormGroup = new FormGroup({})
  newUser:UserResponse = emptyUser()
  users:UserResponse[] = []

  isValid:boolean = false

  onAdd = new EventEmitter();

  constructor(private fb: FormBuilder, private userService:UserService) { }

  ngOnInit(): void {

    this.userService.getUsers().subscribe(
      r => {
        this.users = [...r]
      }
    )
    this.userForm = this.fb.group({
      name:['', Validators.required],
      email: ['',[ Validators.required, Validators.email]],
      department:['',[ Validators.required]]
    })
  }

  addUser():void{
    if(this.userForm.valid){
      this.newUser = this.userForm.value
      this.newUser.created = new Date().toISOString().slice(0, 19)

      this.userService.addUser(this.newUser).subscribe(
        r => {
          this.users.push(r)
          this.users = [...this.users]
        }
      )
      this.onAdd.emit(this.users);
    }
  }

}
