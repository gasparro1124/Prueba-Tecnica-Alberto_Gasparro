export interface UserResponse {
  id:         number;
  name:       string;
  email:      string;
  department: string;
  created:    string;
}

export const emptyUser = ():UserResponse =>{
  return{
    id:-1,
    name:"",
    email:"",
    department:"",
    created:""
  }
}
