import { User } from './../_models/user';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  constructor(private accountService:AccountService){}


  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }



  model :any = {};

  currentUser$ : Observable<User | null> = of(null);
  
  login(){
    this.accountService.login(this.model).subscribe({
      next : response => {
        console.log(response);
      },
      error : error=> {
        console.log(error)
      }
    })
  }
  logout(){
    this.accountService.logout();
  }



}
