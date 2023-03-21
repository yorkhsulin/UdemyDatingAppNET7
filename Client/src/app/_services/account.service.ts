import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  bassUrl = 'https://localhost:5001/api/'
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private httpClient:HttpClient) {}

  login(model:any){
    return this.httpClient.post<User>(this.bassUrl + 'account/login',model).pipe(
      map((response:User) => {
          const user = response;
          if (user){
            localStorage.setItem('user',JSON.stringify(user));
            this.currentUserSource.next(user);

          }
      })
    )
  }
  register(model:any)
  {
    console.log("Service work")
    return this.httpClient.post<User>(this.bassUrl + 'account/Register',model).pipe(
      map(user => {
        console.log("Map User")

        if(user){
          console.log("add user");
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
          return user
        }
        else{
          console.log("no user");
          return null;
        }
      })
    )
  }

  logout (){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
  setCurrentUser(user : User){
    this.currentUserSource.next(user);
  }

}
