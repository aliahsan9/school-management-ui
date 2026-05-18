import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Fee, FeeService } from '../../../core/services/fee.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-fee',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.scss']
})
export class FeeComponent implements OnInit {

  fees: Fee[] = [];
  feeForm!: FormGroup;

  isEditMode = false;
  selectedId: number | null = null;

  constructor(
    private feeService: FeeService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadFees();
  }

  initForm() {
    this.feeForm = this.fb.group({
      studentId: ['', Validators.required],
      amount: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: ['Pending', Validators.required]
    });
  }

  loadFees() {
    this.feeService.getAll().subscribe(res => {
      this.fees = res;
    });
  }

  submit() {
    const data: Fee = this.feeForm.value;

    if (this.isEditMode && this.selectedId !== null) {
      this.feeService.update(this.selectedId, data).subscribe(() => {
        this.reset();
        this.loadFees();
      });
    } else {
      this.feeService.create(data).subscribe(() => {
        this.reset();
        this.loadFees();
      });
    }
  }

  edit(fee: Fee) {
    this.isEditMode = true;
    this.selectedId = fee.id!;

    this.feeForm.patchValue({
      studentId: fee.studentId,
      amount: fee.amount,
      dueDate: fee.dueDate,
      status: fee.status
    });
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this fee record?')) {
      this.feeService.delete(id).subscribe(() => {
        this.loadFees();
      });
    }
  }

  reset() {
    this.feeForm.reset({
      status: 'Pending'
    });

    this.isEditMode = false;
    this.selectedId = null;
  }
}