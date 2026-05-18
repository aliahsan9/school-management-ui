import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Attendance, AttendanceService } from '../../../core/services/attendance.service';
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

  attendanceList: Attendance[] = [];
  attendanceForm!: FormGroup;

  constructor(
    private attendanceService: AttendanceService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadAttendance();
  }

  initForm() {
    this.attendanceForm = this.fb.group({
      studentId: ['', Validators.required],
      date: ['', Validators.required],
      status: ['Present', Validators.required]
    });
  }

  loadAttendance() {
    this.attendanceService.getAll().subscribe(res => {
      this.attendanceList = res;
    });
  }

  submit() {
    const data: Attendance = this.attendanceForm.value;

    this.attendanceService.markAttendance(data).subscribe(() => {
      this.reset();
      this.loadAttendance();
    });
  }

  reset() {
    this.attendanceForm.reset({
      status: 'Present'
    });
  }
}