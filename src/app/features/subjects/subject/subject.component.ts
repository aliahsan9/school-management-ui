import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubjectService, AcademicSubject } from '../../../core/services/subject.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  subjects: AcademicSubject[] = [];
  subjectForm!: FormGroup;

  isEditMode = false;
  selectedId: number | null = null;

  constructor(
    private subjectService: SubjectService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadSubjects();
  }

  initForm() {
    this.subjectForm = this.fb.group({
      name: ['', Validators.required],
      classId: ['', Validators.required],
      teacherId: ['', Validators.required]
    });
  }

  loadSubjects() {
    this.subjectService.getAll().subscribe(res => {
      this.subjects = res;
    });
  }

  submit() {
    const data: AcademicSubject = this.subjectForm.value;

    if (this.isEditMode && this.selectedId !== null) {
      this.subjectService.update(this.selectedId, data).subscribe(() => {
        this.reset();
        this.loadSubjects();
      });
    } else {
      this.subjectService.create(data).subscribe(() => {
        this.reset();
        this.loadSubjects();
      });
    }
  }

  edit(sub: AcademicSubject) {
    this.isEditMode = true;
    this.selectedId = sub.id!;

    this.subjectForm.patchValue({
      name: sub.name,
      classId: sub.classId,
      teacherId: sub.teacherId
    });
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this subject?')) {
      this.subjectService.delete(id).subscribe(() => {
        this.loadSubjects();
      });
    }
  }

  reset() {
    this.subjectForm.reset();
    this.isEditMode = false;
    this.selectedId = null;
  }
}