import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Student, StudentService } from '../../../core/services/student.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student',
  imports:[RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  students: Student[] = [];
  studentForm!: FormGroup;

  isEditMode = false;
  selectedId: number | null = null;

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadStudents();
  }

  initForm() {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      classId: ['', Validators.required]
    });
  }

  loadStudents() {
    this.studentService.getAll().subscribe(res => {
      this.students = res;
    });
  }

  submit() {
    const data = this.studentForm.value;

    if (this.isEditMode && this.selectedId !== null) {
      this.studentService.update(this.selectedId, data).subscribe(() => {
        this.reset();
        this.loadStudents();
      });
    } else {
      this.studentService.create(data).subscribe(() => {
        this.reset();
        this.loadStudents();
      });
    }
  }

  edit(student: Student) {
    this.isEditMode = true;
    this.selectedId = student.id!;

    this.studentForm.patchValue({
      firstName: student.firstName,
      lastName: student.lastName,
      gender: student.gender,
      dateOfBirth: student.dateOfBirth,
      phoneNumber: student.phoneNumber,
      address: student.address,
      classId: student.classId
    });
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.delete(id).subscribe(() => {
        this.loadStudents();
      });
    }
  }

  reset() {
    this.studentForm.reset();
    this.isEditMode = false;
    this.selectedId = null;
  }
}