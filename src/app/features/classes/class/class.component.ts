import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClassModel, ClassService } from '../../../core/services/class.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-class',
  imports:[RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {

  classes: ClassModel[] = [];
  classForm!: FormGroup;

  isEditMode = false;
  selectedId: number | null = null;

  constructor(
    private classService: ClassService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadClasses();
  }

  initForm() {
    this.classForm = this.fb.group({
      name: ['', Validators.required],
      section: ['', Validators.required],
      teacherId: ['', Validators.required]
    });
  }

  loadClasses() {
    this.classService.getAll().subscribe(res => {
      this.classes = res;
    });
  }

  submit() {
    const data = this.classForm.value;

    if (this.isEditMode && this.selectedId !== null) {
      this.classService.update(this.selectedId, data).subscribe(() => {
        this.reset();
        this.loadClasses();
      });
    } else {
      this.classService.create(data).subscribe(() => {
        this.reset();
        this.loadClasses();
      });
    }
  }

  edit(cls: ClassModel) {
    this.isEditMode = true;
    this.selectedId = cls.id!;

    this.classForm.patchValue({
      name: cls.name,
      section: cls.section,
      teacherId: cls.teacherId
    });
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this class?')) {
      this.classService.delete(id).subscribe(() => {
        this.loadClasses();
      });
    }
  }

  reset() {
    this.classForm.reset();
    this.isEditMode = false;
    this.selectedId = null;
  }
}