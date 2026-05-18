import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService, RegisterSchoolDto } from '../../../core/services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports:[RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm!: FormGroup;

  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {

    this.signupForm = this.fb.group({

      schoolName: [
        '',
        Validators.required
      ],

      adminName: [
        '',
        Validators.required
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]

    });

  }

  // =====================================
  // SUBMIT
  // =====================================

  onSubmit(): void {

    if (this.signupForm.invalid) {

      this.signupForm.markAllAsTouched();

      return;

    }

    this.loading = true;

    const payload: RegisterSchoolDto =
      this.signupForm.value;

    this.authService
      .registerSchool(payload)
      .subscribe({

        next: (res: any) => {

          console.log(res);

          alert('School Registered Successfully');

          this.signupForm.reset();

          this.loading = false;

        },

        error: (err: any) => {

          console.error(err);

          alert('Registration Failed');

          this.loading = false;

        }

      });

  }

}