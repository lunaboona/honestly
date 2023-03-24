import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent {
  login_form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  error?: string;
  signUp = false; // TODO lol this is janky

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    if (this.login_form.valid) {
      delete this.error;

      // TODO refactor
      const { email, password } = this.login_form.value;
      if (this.signUp) {
        this.authService
          .signUp(email!, password!)
          .then(() => {
            this.router.navigateByUrl('/');
          })
          .catch((err) => {
            this.error = err;
          });
      } else {
        this.authService
          .signIn(email!, password!)
          .then(() => {
            this.router.navigateByUrl('/');
          })
          .catch((err) => {
            this.error = err;
          });
      }
    }
  }
}
