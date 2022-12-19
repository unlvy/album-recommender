import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private snackBarDuration = 3000; // ms
  public isLogin = true;

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', { validators: [Validators.required] }),
    password: new FormControl('', { validators: [Validators.required] })
  });

  public registerForm: FormGroup = new FormGroup({
    username: new FormControl('', { validators: [Validators.required] }),
    password: new FormControl('', { validators: [Validators.required] })
  });

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) { }

  public get loginUsername() { return this.loginForm.get('username'); }
  public get loginPassword() { return this.loginForm.get('password'); }
  public get registerUsername() { return this.registerForm.get('username'); }
  public get registerPassword() { return this.registerForm.get('password'); }

  public onChangeForm(): void {
    this.isLogin = !this.isLogin;
  }

  public onSubmitLogin(): void {
    this.authService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }).subscribe({
      next: () => {
        this.router.navigate([this.authService.LOGGED_PATH]);
        this.snackBar.open('Signed in', 'Close', { duration: this.snackBarDuration });
      },
      error: (error: any) => {
        this.snackBar.open('Auth error', 'Close', { duration: this.snackBarDuration });
        console.log(error);
      }
    });
  }

  public onSubmitRegister(): void {
    this.authService.register({
      username: this.registerForm.value.username,
      password: this.registerForm.value.password
    }).subscribe({
      next: () => {
        this.isLogin = true;
        this.snackBar.open('User registered', 'Close', { duration: this.snackBarDuration });
      },
      error: (error: any) => {
        this.snackBar.open('Username already in use', 'Close', { duration: this.snackBarDuration });
        console.log(error);
      }
    });
  }

}
