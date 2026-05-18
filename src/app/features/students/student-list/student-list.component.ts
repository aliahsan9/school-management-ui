import { Component, OnInit } from '@angular/core';

import {
  StudentService,
  Student
} from '../../../core/services/student.service';

@Component({
  selector: 'app-student-list',
  standalone: false,
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent
implements OnInit {

  students: Student[] = [];

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit(): void {

    this.loadStudents();

  }

  loadStudents(): void {

    this.studentService
      .getAll()
      .subscribe({

        next: (res) => {

          this.students = res;

        }

      });

  }

  delete(id: number): void {

    if (!confirm('Delete Student?'))
      return;

    this.studentService
      .delete(id)
      .subscribe({

        next: () => {

          this.loadStudents();

        }

      });

  }

}