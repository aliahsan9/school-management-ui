import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import {
  Chart,
  registerables
} from 'chart.js';

import {
  Student,
  StudentService
} from '../../core/services/student.service';

import { TeacherService }
from '../../core/services/teacher.service';

import { ClassService }
from '../../core/services/class.service';

import { SubjectService }
from '../../core/services/subject.service';

import { AttendanceService }
from '../../core/services/attendance.service';

import { FeeService }
from '../../core/services/fee.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-layout',

  standalone: true,

  imports: [
    CommonModule,
    RouterModule
  ],

  templateUrl:
    './dashboard-layout.component.html',

  styleUrls: [
    './dashboard-layout.component.scss'
  ]
})
export class DashboardLayoutComponent
implements OnInit {

  statsCards: any[] = [];

  students: Student[] = [];

  fees: any[] = [];

  attendance: any[] = [];

  constructor(
    private studentService: StudentService,

    private teacherService: TeacherService,

    private classService: ClassService,

    private subjectService: SubjectService,

    private attendanceService: AttendanceService,

    private feeService: FeeService
  ) { }

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {

    this.statsCards = [];

    // =========================
    // STUDENTS
    // =========================
    this.studentService
      .getAllStudents()
      .subscribe({

        next: (res: Student[]) => {

          this.students = res;

          this.statsCards.push({
            title: 'Students',
            value: res.length
          });

          this.renderStudentsChart();
        },

        error: (err) => {
          console.error(err);
        }
      });

    // =========================
    // TEACHERS
    // =========================
    this.teacherService
      .getAll()
      .subscribe({

        next: (res: any[]) => {

          this.statsCards.push({
            title: 'Teachers',
            value: res.length
          });
        },

        error: (err) => {
          console.error(err);
        }
      });

    // =========================
    // CLASSES
    // =========================
    this.classService
      .getAll()
      .subscribe({

        next: (res: any[]) => {

          this.statsCards.push({
            title: 'Classes',
            value: res.length
          });
        },

        error: (err) => {
          console.error(err);
        }
      });

    // =========================
    // SUBJECTS
    // =========================
    this.subjectService
      .getAll()
      .subscribe({

        next: (res: any[]) => {

          this.statsCards.push({
            title: 'Subjects',
            value: res.length
          });
        },

        error: (err) => {
          console.error(err);
        }
      });

    // =========================
    // ATTENDANCE
    // =========================
    this.attendanceService
      .getAll()
      .subscribe({

        next: (res: any[]) => {

          this.attendance = res;

          this.statsCards.push({
            title: 'Attendance',
            value: res.length
          });

          this.renderAttendanceChart();
        },

        error: (err) => {
          console.error(err);
        }
      });

    // =========================
    // FEES
    // =========================
    this.feeService
      .getAll()
      .subscribe({

        next: (res: any[]) => {

          this.fees = res;

          const paid =
            res.filter(
              (f: any) => f.status === 'Paid'
            ).length;

          const pending =
            res.filter(
              (f: any) => f.status === 'Pending'
            ).length;

          this.statsCards.push({
            title: 'Fees Paid',
            value: paid
          });

          this.statsCards.push({
            title: 'Pending Fees',
            value: pending
          });

          this.renderFeesChart(
            paid,
            pending
          );
        },

        error: (err) => {
          console.error(err);
        }
      });
  }

  // =========================
  // STUDENTS CHART
  // =========================
  renderStudentsChart(): void {

    const existingChart =
      Chart.getChart('studentsChart');

    if (existingChart) {
      existingChart.destroy();
    }

    new Chart('studentsChart', {

      type: 'line',

      data: {

        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May'
        ],

        datasets: [
          {
            label: 'Students Growth',

            data: [
              10,
              20,
              35,
              50,
              this.students.length
            ],

            borderColor: '#0d6efd',

            backgroundColor:
              'rgba(13,110,253,0.2)',

            fill: true
          }
        ]
      }
    });
  }

  // =========================
  // FEES CHART
  // =========================
  renderFeesChart(
    paid: number,
    pending: number
  ): void {

    const existingChart =
      Chart.getChart('feesChart');

    if (existingChart) {
      existingChart.destroy();
    }

    new Chart('feesChart', {

      type: 'doughnut',

      data: {

        labels: [
          'Paid',
          'Pending'
        ],

        datasets: [
          {
            data: [
              paid,
              pending
            ],

            backgroundColor: [
              '#28a745',
              '#ffc107'
            ]
          }
        ]
      }
    });
  }

  // =========================
  // ATTENDANCE CHART
  // =========================
  renderAttendanceChart(): void {

    const existingChart =
      Chart.getChart('attendanceChart');

    if (existingChart) {
      existingChart.destroy();
    }

    const present =
      this.attendance.filter(
        (a: any) => a.status === 'Present'
      ).length;

    const absent =
      this.attendance.filter(
        (a: any) => a.status === 'Absent'
      ).length;

    const late =
      this.attendance.filter(
        (a: any) => a.status === 'Late'
      ).length;

    new Chart('attendanceChart', {

      type: 'bar',

      data: {

        labels: [
          'Present',
          'Absent',
          'Late'
        ],

        datasets: [
          {
            label:
              'Attendance Overview',

            data: [
              present,
              absent,
              late
            ],

            backgroundColor: [
              '#28a745',
              '#dc3545',
              '#ffc107'
            ]
          }
        ]
      }
    });
  }
}