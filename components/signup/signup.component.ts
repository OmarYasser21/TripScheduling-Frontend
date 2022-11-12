import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../user.service";
import {User} from "../../user";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user=new User();
  exform!: FormGroup;

  constructor(private userService: UserService, private _router: Router) { }

  ngOnInit(): void {
    this.exform = new FormGroup({
      'username' : new FormControl(null, Validators.required),
      'password' : new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required]),
      'phone':new FormControl(null, [Validators.required]),
    });
  }

  addUser(){
    this.userService.addUser(this.user).subscribe((data: any) => {
      console.log(data);
      this._router.navigate(['/login']);
    });
  }


}
