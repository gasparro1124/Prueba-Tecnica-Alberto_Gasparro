import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserResponse } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  allUsers: UserResponse[] = []

  private servicioUrl: string = 'http://34.241.217.201/users_agb/'


  constructor(private http: HttpClient ) { }


  getUsers():Observable<UserResponse[]>{
    return this.http.get<UserResponse[]>(this.servicioUrl)
  }

  editUSer(user:UserResponse):Observable<UserResponse>{
    return this.http.put<UserResponse>(this.servicioUrl+user.id, user)
  }

  deleteUser(user:UserResponse):Observable<{}>{
    return this.http.delete(this.servicioUrl+user.id)
  }

  addUser(user:UserResponse):Observable<UserResponse>{
    return this.http.post<UserResponse>(this.servicioUrl, user)
  }

}
