import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DeleteUSerComponent } from '../delete-user/delete-user.component';
import { UserResponse, emptyUser } from '../interfaces';
import { UserService } from '../user.service';

import {MatDialog} from '@angular/material/dialog';



@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  @Input() users: UserResponse[] = []

  userForm!:FormGroup

  editStatus:Boolean = false
  userEdit:UserResponse = emptyUser()

  constructor(private userService: UserService, private deleteUser: MatDialog,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name:['', Validators.required],
      email: ['',[ Validators.required, Validators.email]],
      department:['']
    })
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
      this.userService.allUsers = this.users
    });

    ref.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }

  isEditActive(user:UserResponse){
    this.editStatus = true
    this.userEdit = user

    this.userForm.controls['name'].setValue(user.name);
    this.userForm.controls['email'].setValue(user.email);
    this.userForm.controls['department'].setValue(user.department);
  }

  isEditDisable(){
    this.editStatus = false
    this.userEdit =emptyUser()
  }

  sendEdit(user:UserResponse){

    if(this.userForm.valid){

      user = {
        id:user.id,
        name:this.userForm.value.name,
        email:this.userForm.value.email,
        department:this.userForm.value.department,
        created: new Date().toISOString().slice(0, 19)
      }

      this.userService.editUSer(user).subscribe(u=>{
        const idToUpdate = u
          ? this.users.findIndex(c => c.id == u.id)
          :-1
        if( idToUpdate > -1){
          this.users[idToUpdate] = user
          this.userService.allUsers = this.users
        }
      })

      this.editStatus = false
      this.userEdit =emptyUser()

    }else{
      alert('error')
      this.editStatus = false
      this.userEdit =emptyUser()

    }



  }

}
