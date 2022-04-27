import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DeleteUserComponent } from '../../../modals/delete-user/delete-user.component';
import { UserResponse, emptyUser } from '../../../commons/interfaces';
import { UserService } from '../../../commons/user.service';

import {MatDialog} from '@angular/material/dialog';



@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  @Input() users: UserResponse[] = []

  userForm!:FormGroup

  userEdit:UserResponse = emptyUser()

  constructor(private userService: UserService, private deleteUser: MatDialog,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name:['', Validators.required],
      email: ['',[ Validators.required, Validators.email]],
      department:['']
    })
  }

  openDialog(user:UserResponse) {
    const ref = this.deleteUser.open(DeleteUserComponent, {
      width:'60%',
      disableClose:true,
      panelClass: 'custom-dialog-container',
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
    this.userEdit = user
    this.userForm.controls['name'].setValue(user.name);
    this.userForm.controls['email'].setValue(user.email);
    this.userForm.controls['department'].setValue(user.department);
  }

  isEditDisable(){
    this.userEdit = emptyUser()
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

      this.userService.editUser(user).subscribe(u=>{
        const idToUpdate = u
          ? this.users.findIndex(c => c.id == u.id)
          :-1
        if( idToUpdate > -1){
          this.users[idToUpdate] = user
          this.userService.allUsers = this.users
        }
      })

      this.userEdit = emptyUser()

    }else{
      alert('error')
      this.userEdit = emptyUser()
    }
    
  }

}
