import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Student, StudentService } from '../../../core/services/student.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-student',

  imports: [RouterModule,
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl: './student.component.html',

  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  students: Student[] = [];

  studentForm!: FormGroup;

  isEditMode = false;

  selectedStudentId = '';

  loading = false;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {

    this.initializeForm();

    this.loadStudents();
  }

  initializeForm(): void {

    this.studentForm = this.fb.group({

      admissionNumber: ['', Validators.required],

      firstName: ['', Validators.required],

      lastName: ['', Validators.required],

      gender: [0, Validators.required],

      dateOfBirth: ['', Validators.required],

      fatherName: ['', Validators.required],

      motherName: ['', Validators.required],

      phoneNumber: ['', Validators.required],

      address: ['', Validators.required],

      admissionDate: ['', Validators.required],

      isActive: [true]
    });
  }

  loadStudents(): void {

    this.loading = true;
 
    this.studentService
      .getAllStudents()
      .subscribe({

        next: (response) => {

          this.students = response;

          this.loading = false;
        },

        error: (error) => {

          console.log(error);

          this.loading = false;
        }
      });
  }

  onSubmit(): void {

    if (this.studentForm.invalid) {

      this.studentForm.markAllAsTouched();

      return;
    }

    const payload = this.studentForm.value;

    if (this.isEditMode) {

      this.studentService
        .updateStudent(
          this.selectedStudentId,
          payload
        )
        .subscribe({

          next: () => {

            alert('Student updated successfully');

            this.resetForm();

            this.loadStudents();
          },

          error: (error) => {

            console.log(error);

            alert('Update failed');
          }
        });
    }

    else {

      this.studentService
        .createStudent(payload)
        .subscribe({

          next: () => {

            alert('Student created successfully');

            this.resetForm();

            this.loadStudents();
          },

          error: (error) => {

            console.log(error);

            alert('Create failed');
          }
        });
    }
  }

  editStudent(student: Student): void {

    this.isEditMode = true;

    this.selectedStudentId = student.id;

    this.studentForm.patchValue({

      admissionNumber: student.admissionNumber,

      firstName: student.firstName,

      lastName: student.lastName,

      gender: student.gender,

      dateOfBirth:
        student.dateOfBirth.split('T')[0],

      fatherName: student.fatherName,

      motherName: student.motherName,

      phoneNumber: student.phoneNumber,

      address: student.address,

      admissionDate:
        student.admissionDate.split('T')[0],

      isActive: student.isActive
    });
  }

  deleteStudent(id: string): void {

    const confirmDelete =
      confirm('Are you sure?');

    if (!confirmDelete)
      return;

    this.studentService
      .deleteStudent(id)
      .subscribe({

        next: () => {

          alert('Student deleted');

          this.loadStudents();
        },

        error: (error) => {

          console.log(error);

          alert('Delete failed');
        }
      });
  }

  resetForm(): void {

    this.isEditMode = false;

    this.selectedStudentId = '';

    this.studentForm.reset();

    this.studentForm.patchValue({
      gender: 0,
      isActive: true
    });
  }

  getGenderText(gender: number): string {

    return gender === 0
      ? 'Male'
      : 'Female';
  }
}