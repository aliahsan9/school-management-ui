import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { StudentService } from '../../core/services/student.service';
import { TeacherService } from '../../core/services/teacher.service';
import { ClassService } from '../../core/services/class.service';
import { SubjectService } from '../../core/services/subject.service';
import { AttendanceService } from '../../core/services/attendance.service';
import { FeeService } from '../../core/services/fee.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-layout',
  imports:[RouterModule, CommonModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {

  statsCards: any[] = [];

  students: any[] = [];
  fees: any[] = [];
  attendance: any[] = [];

  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService,
    private classService: ClassService,
    private subjectService: SubjectService,
    private attendanceService: AttendanceService,
    private feeService: FeeService
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {

    this.statsCards = [];

    // STUDENTS
    this.studentService.getAll().subscribe(res => {
      this.students = res;

      this.statsCards.push({
        title: 'Students',
        value: res.length
      });

      this.renderStudentsChart();
    });

    // TEACHERS
    this.teacherService.getAll().subscribe(res => {
      this.statsCards.push({
        title: 'Teachers',
        value: res.length
      });
    });

    // CLASSES
    this.classService.getAll().subscribe(res => {
      this.statsCards.push({
        title: 'Classes',
        value: res.length
      });
    });

    // SUBJECTS
    this.subjectService.getAll().subscribe(res => {
      this.statsCards.push({
        title: 'Subjects',
        value: res.length
      });
    });

    // ATTENDANCE
    this.attendanceService.getAll().subscribe(res => {
      this.attendance = res;

      this.statsCards.push({
        title: 'Attendance',
        value: res.length
      });

      this.renderAttendanceChart();
    });

    // FEES
    this.feeService.getAll().subscribe(res => {
      this.fees = res;

      const paid = res.filter(f => f.status === 'Paid').length;
      const pending = res.filter(f => f.status === 'Pending').length;

      this.statsCards.push({
        title: 'Fees Paid',
        value: paid
      });

      this.statsCards.push({
        title: 'Pending Fees',
        value: pending
      });

      this.renderFeesChart(paid, pending);
    });
  }

  // ==========================
  // STUDENTS CHART
  // ==========================
  renderStudentsChart() {

    new Chart('studentsChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          label: 'Students Growth',
          data: [10, 20, 35, 50, this.students.length],
          borderColor: '#0d6efd',
          fill: true
        }]
      }
    });
  }

  // ==========================
  // FEES CHART
  // ==========================
  renderFeesChart(paid: number, pending: number) {

    new Chart('feesChart', {
      type: 'doughnut',
      data: {
        labels: ['Paid', 'Pending'],
        datasets: [{
          data: [paid, pending],
          backgroundColor: ['#28a745', '#ffc107']
        }]
      }
    });
  }

  // ==========================
  // ATTENDANCE CHART
  // ==========================
  renderAttendanceChart() {

    const present = this.attendance.filter(a => a.status === 'Present').length;
    const absent = this.attendance.filter(a => a.status === 'Absent').length;
    const late = this.attendance.filter(a => a.status === 'Late').length;

    new Chart('attendanceChart', {
      type: 'bar',
      data: {
        labels: ['Present', 'Absent', 'Late'],
        datasets: [{
          label: 'Attendance Overview',
          data: [present, absent, late],
          backgroundColor: ['#28a745', '#dc3545', '#ffc107']
        }]
      }
    });
  }
}