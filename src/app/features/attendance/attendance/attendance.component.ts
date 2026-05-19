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
  MarkAttendanceDto,
  StudentAttendanceDto
} from '../../../core/services/attendance.service';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
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

  // ============================
  // SUBMIT
  // ============================
  submit(): void {
    if (this.attendanceForm.invalid) {
      this.attendanceForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const form = this.attendanceForm.value;

    const student: StudentAttendanceDto = {
      studentId: form.studentId,
      status: Number(form.status)
    };

    const payload: MarkAttendanceDto = {
      classId: form.classId,
      date: form.date,
      students: [student]
    };

    this.attendanceService.markAttendance(payload)
      .subscribe({
        next: () => {
          this.loadAttendance();
          this.reset();
          this.loading = false;
        },
        error: (err) => {
          console.error('Attendance Error:', err);
          this.loading = false;
        }
      });
  }

  // ============================
  // LOAD
  // ============================
  loadAttendance(): void {
    const classId = this.attendanceForm.get('classId')?.value;
    const date = this.attendanceForm.get('date')?.value;

    if (!classId || !date) return;

    this.attendanceService.getClassAttendance(classId, date)
      .subscribe({
        next: (res) => {
          this.attendanceList = res;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  // ============================
  // RESET
  // ============================
  reset(): void {
    this.attendanceForm.reset({
      status: 0
    });
  }
} 