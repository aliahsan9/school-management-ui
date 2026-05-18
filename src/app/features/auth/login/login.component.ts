import { Component } from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router, RouterModule } from '@angular/router';

import {
  AuthService,
  LoginDto
} from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports:[RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loading = false;

  loginForm;

  constructor(

    private fb: FormBuilder,

    private authService: AuthService,

    private router: Router

  ) {

    this.loginForm =
      this.fb.group({

        email: [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],

        password: [
          '',
          Validators.required
        ]

      });

  }

  onSubmit(): void {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;

    }

    this.loading = true;

    const payload =
      this.loginForm.value as LoginDto;

    this.authService
      .login(payload)
      .subscribe({

        next: (res) => {

          this.authService
            .saveToken(res.token);

          this.router.navigate([
            '/dashboard'
          ]);

          this.loading = false;

        },

        error: (err) => {

          console.log(err);

          alert('Invalid Credentials');

          this.loading = false;

        }

      });

  }

}