import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from '../../shared-components/message/message';
import { AuthData } from '../../../interfaces/auth/auth';
import { Auth } from '../../../services/auth/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, Message],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private _router: Router, private _auth: Auth) {}

  // if true show message
  showReqiredEmail: boolean = false;
  showReqiredPassword: boolean = false;
  //
  // what to show in error message
  message: string = '';

  //input data
  inputData: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  //if clicked login button
  login() {
    //return show errors to default values
    this.showReqiredEmail = false;
    this.showReqiredPassword = false;

    if (!this.inputData.valid) {
      this.showReqiredEmail = this.inputData.get('email')?.invalid ?? true;
      this.showReqiredPassword = this.inputData.get('password')?.invalid ?? true;

      //stop here if input is not valid
      return;
    }
    let logInDate: AuthData = {
      email: this.inputData.get('email')?.value,
      Password: this.inputData.get('password')?.value,
    };
    this._auth.login(logInDate).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this._router.navigate(['mainPage']);
      },
      error: (err) => (this.message = err.error?.message ?? err.error ?? 'Unexpected Error'),
    });
  }

  //if clicked signup
  navigateToSignUpPage() {
    this._router.navigate(['signup']);
  }
}
