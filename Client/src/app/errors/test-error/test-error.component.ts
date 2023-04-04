import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent implements OnInit {
  bassUrl = 'https://localhost:5001/api/';
  validationErrors :string[] = [] ;

  constructor(private httpClient:HttpClient) {}

  ngOnInit(): void {

  }

  get404Error(){
    this.httpClient.get(this.bassUrl+'buggy/not-found').subscribe({
      next : response=> {console.log(response);},
      error : error => {console.log(error)}
    });
  }

  get401Error(){
    this.httpClient.get(this.bassUrl+'buggy/auth').subscribe({
      next : response=> {console.log(response);},
      error : error => {console.log(error)}
    });
  }

  get500Error(){
    this.httpClient.get(this.bassUrl+'buggy/server-error').subscribe({
      next : response=> {console.log(response);},
      error : error => {console.log(error)}
    });
  }

  get400Error(){
    this.httpClient.get(this.bassUrl+'buggy/bad-request').subscribe({
      next : response=> {console.log(response);},
      error : error => {console.log(error)}
    });
  }

  get400ValidationError(){
    this.httpClient.post(this.bassUrl+'account/Register',{}).subscribe({
      next : response=> {console.log(response);},
      error : error => {
        console.log(error); 
        this.validationErrors = error;
      }
    });
  }

}
