import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormFieldComponent } from '../form-field/form-field.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormFieldComponent],
})
export class LoginComponent {
  loginForm!: FormGroup;
  signupForm!: FormGroup;

  currentTab: 'login' | 'signup' = 'login';

  loginError?: string;
  signupError?: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmitLogin() {
    if (this.loginForm.valid) {
      delete this.loginError;

      const { email, password } = this.loginForm.value;
      this.authService
        .signIn(email!, password!)
        .then(() => {
          this.router.navigateByUrl('/');
        })
        .catch((err) => {
          this.loginError = err;
        });
    }
  }

  onSubmitSignup() {
    if (this.signupForm.valid) {
      delete this.signupError;

      const { email, username, password } = this.signupForm.value;
      this.authService
        .signUp(email!, password!, username!)
        .then(() => {
          this.router.navigateByUrl('/');
        })
        .catch((err) => {
          this.signupError = err;
        });
    }
  }
}
