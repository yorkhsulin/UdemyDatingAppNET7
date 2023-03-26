import { User } from './../_models/user';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  constructor(private accountService:AccountService,
              private router:Router,
              private toast:ToastrService){}

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }
  model :any = {};
  currentUser$ : Observable<User | null> = of(null);

  login(){
    this.accountService.login(this.model).subscribe({
      next : response => {
        this.router.navigateByUrl('/Member');
      },
      error : error=> {
        this.toast.error(error.error,"Login Error");
      }
    })
  }
  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }



}
