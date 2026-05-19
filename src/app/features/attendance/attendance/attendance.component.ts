import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import {
  AttendanceService,
  AttendanceResponse,
  MarkAttendanceDto
} from '../../../core/services/attendance.service';

import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  attendanceList: AttendanceResponse[] = [];

  attendanceForm!: FormGroup;

  loading = false;

  constructor(
    private attendanceService: AttendanceService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    this.initForm();

  }

  initForm(): void {

    this.attendanceForm = this.fb.group({

      classId: ['', Validators.required],

      studentId: ['', Validators.required],

      date: ['', Validators.required],

      status: [0, Validators.required]

    });

  }

  submit(): void {

    if (this.attendanceForm.invalid) {
      this.attendanceForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const formValue = this.attendanceForm.value;

    const payload: MarkAttendanceDto = {

      classId: formValue.classId,

      date: formValue.date,

      students: [
        {
          studentId: formValue.studentId,
          status: Number(formValue.status)
        }
      ]

    };

    this.attendanceService
      .markAttendance(payload)
      .subscribe({

        next: () => {

          this.loadAttendance();

          this.reset();

          this.loading = false;

        },

        error: (err) => {

          console.error(err);

          this.loading = false;

        }

      });

  }

  loadAttendance(): void {

    const classId =
      this.attendanceForm.get('classId')?.value;

    const date =
      this.attendanceForm.get('date')?.value;

    if (!classId || !date) {
      return;
    }

    this.attendanceService
      .getClassAttendance(classId, date)
      .subscribe({

        next: (res: AttendanceResponse[]) => {

          this.attendanceList = res;

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  reset(): void {

    this.attendanceForm.reset({

      status: 0

    });

  }

}