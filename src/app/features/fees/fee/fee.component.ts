import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FeeService, FeeResponse, CreateFee } from '../../../core/services/fee.service';

@Component({
  selector: 'app-fee',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.scss']
})
export class FeeComponent implements OnInit {

  fees: FeeResponse[] = [];
  feeForm!: FormGroup;

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
      title: ['', Validators.required],
      amount: ['', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  loadFees() {
    this.feeService.getAll().subscribe({
      next: (res) => this.fees = res,
      error: (err) => console.error(err)
    });
  }

  submit() {
    const data: CreateFee = this.feeForm.value;

    this.feeService.create(data).subscribe({
      next: () => {
        this.reset();
        this.loadFees();
      },
      error: (err) => console.error(err)
    });
  }

  reset() {
    this.feeForm.reset();
  }
}