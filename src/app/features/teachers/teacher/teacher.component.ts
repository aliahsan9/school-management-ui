import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Teacher, TeacherService } from '../../../core/services/teacher.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-teacher',
  imports:[CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  teachers: Teacher[] = [];
  teacherForm!: FormGroup;
  isEditMode = false;
  selectedId: number | null = null;

  constructor(
    private teacherService: TeacherService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadTeachers();
  }

  initForm() {
    this.teacherForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      qualification: ['', Validators.required],
      salary: [0, Validators.required]
    });
  }

  loadTeachers() {
    this.teacherService.getAll().subscribe(res => {
      this.teachers = res;
    });
  }

  submit() {
    const data = this.teacherForm.value;

    if (this.isEditMode && this.selectedId !== null) {
      this.teacherService.update(this.selectedId, data).subscribe(() => {
        this.reset();
        this.loadTeachers();
      });
    } else {
      this.teacherService.create(data).subscribe(() => {
        this.reset();
        this.loadTeachers();
      });
    }
  }

  edit(teacher: Teacher) {
    this.isEditMode = true;
    this.selectedId = teacher.id!;

    this.teacherForm.patchValue({
      fullName: teacher.fullName,
      email: teacher.email,
      phoneNumber: teacher.phoneNumber,
      qualification: teacher.qualification,
      salary: teacher.salary
    });
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this teacher?')) {
      this.teacherService.delete(id).subscribe(() => {
        this.loadTeachers();
      });
    }
  }

  reset() {
    this.teacherForm.reset();
    this.isEditMode = false;
    this.selectedId = null;
  }
}