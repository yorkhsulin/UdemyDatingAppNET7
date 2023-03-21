import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() usersFromHomeComponent:any;
  @Output() cancelRegister = new EventEmitter();

  model:any = {};

  ngOnInit(): void {

  }
  constructor(private accountService:AccountService){}


  register(){
    console.log("register call ===")
    this.accountService.register(this.model).subscribe({
      next : Response=>{
        console.log(Response);
        this.cancel()

      },
      error : error=>
            console.log(error)

    })
  }
  cancel(){
    this.cancelRegister.emit(false);
  }

}
