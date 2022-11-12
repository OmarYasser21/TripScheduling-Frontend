import { Component, OnInit } from '@angular/core';
import {User} from "../../user";
import {UserService} from "../../user.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user=new User();
  exform!: FormGroup;



  constructor(private userService: UserService, private _router: Router) { }

  ngOnInit(): void {
    this.exform = new FormGroup({
      'username' : new FormControl(null),
      'password' : new FormControl(null),
    });
  }

  login(){
    this.userService.login(this.user).subscribe((data: any) => {
      console.log(data);
      this._router.navigate(['/home']);
    });
  }
}
