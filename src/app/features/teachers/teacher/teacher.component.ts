import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CreateTeacher, Teacher, TeacherService, UpdateTeacher } from '../../../core/services/teacher.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-teacher',
  imports:[RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  teachers: Teacher[] = [];

  teacherForm!: FormGroup;

  selectedTeacherId: string | null = null;

  loading = false;

  submitted = false;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService
  ) { }

  ngOnInit(): void {

    this.initializeForm();

    this.loadTeachers();

  }

  initializeForm(): void {

    this.teacherForm = this.fb.group({

      firstName: ['', Validators.required],

      lastName: ['', Validators.required],

      gender: [1, Validators.required],

      dateOfBirth: ['', Validators.required],

      qualification: ['', Validators.required],

      experienceYears: [0, Validators.required],

      phoneNumber: ['', Validators.required],

      address: ['', Validators.required],

      joiningDate: ['', Validators.required],

      salary: [0, Validators.required],

      userId: [null],

      isActive: [true]

    });

  }

  loadTeachers(): void {

    this.loading = true;

    this.teacherService.getAll().subscribe({

      next: (response) => {

        this.teachers = response;

        this.loading = false;

      },

      error: (error) => {

        console.error(error);

        this.loading = false;

      }

    });

  }

  saveTeacher(): void {

    this.submitted = true;

    if (this.teacherForm.invalid) {
      return;
    }

    if (this.selectedTeacherId) {

      const updateData: UpdateTeacher = {

        firstName: this.teacherForm.value.firstName,

        lastName: this.teacherForm.value.lastName,

        phoneNumber: this.teacherForm.value.phoneNumber,

        address: this.teacherForm.value.address,

        experienceYears: this.teacherForm.value.experienceYears,

        salary: this.teacherForm.value.salary,

        isActive: this.teacherForm.value.isActive

      };

      this.teacherService
        .update(this.selectedTeacherId, updateData)
        .subscribe({

          next: () => {

            alert('Teacher updated successfully');

            this.resetForm();

            this.loadTeachers();

          },

          error: (error) => {

            console.error(error);

          }

        });

    } else {

      const createData: CreateTeacher = {

        firstName: this.teacherForm.value.firstName,

        lastName: this.teacherForm.value.lastName,

        gender: this.teacherForm.value.gender,

        dateOfBirth: this.teacherForm.value.dateOfBirth,

        qualification: this.teacherForm.value.qualification,

        experienceYears: this.teacherForm.value.experienceYears,

        phoneNumber: this.teacherForm.value.phoneNumber,

        address: this.teacherForm.value.address,

        joiningDate: this.teacherForm.value.joiningDate,

        salary: this.teacherForm.value.salary,

        userId: this.teacherForm.value.userId

      };

      this.teacherService
        .create(createData)
        .subscribe({

          next: () => {

            alert('Teacher created successfully');

            this.resetForm();

            this.loadTeachers();

          },

          error: (error) => {

            console.error(error);

          }

        });

    }

  }

  editTeacher(teacher: Teacher): void {

    this.selectedTeacherId = teacher.id!;

    const names = teacher.fullName.split(' ');

    this.teacherForm.patchValue({

      firstName: names[0],

      lastName: names[1] || '',

      phoneNumber: teacher.phoneNumber,

      qualification: teacher.qualification,

      experienceYears: teacher.experienceYears,

      salary: teacher.salary,

      isActive: teacher.isActive

    });

  }

  deleteTeacher(id: string): void {

    if (!confirm('Are you sure to delete this teacher?')) {
      return;
    }

    this.teacherService.delete(id).subscribe({

      next: () => {

        alert('Teacher deleted successfully');

        this.loadTeachers();

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  resetForm(): void {

    this.submitted = false;

    this.selectedTeacherId = null;

    this.teacherForm.reset({

      gender: 1,

      experienceYears: 0,

      salary: 0,

      userId: null,

      isActive: true

    });

  }

}