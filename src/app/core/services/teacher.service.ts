import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private readonly baseUrl =
    `${environment.apiUrl}/teachers`;

  constructor(
    private http: HttpClient
  ) { }

  // =========================
  // GET ALL TEACHERS
  // =========================
  getAll(): Observable<Teacher[]> {

    return this.http.get<Teacher[]>(
      this.baseUrl
    );

  }

  // =========================
  // GET TEACHER BY ID
  // =========================
  getById(id: string): Observable<Teacher> {

    return this.http.get<Teacher>(
      `${this.baseUrl}/${id}`
    );

  }

  // =========================
  // CREATE TEACHER
  // =========================
  create(data: CreateTeacher): Observable<any> {

    return this.http.post(
      this.baseUrl,
      data
    );

  }

  // =========================
  // UPDATE TEACHER
  // =========================
  update(
    id: string,
    data: UpdateTeacher
  ): Observable<any> {

    return this.http.put(
      `${this.baseUrl}/${id}`,
      data
    );

  }

  // =========================
  // DELETE TEACHER
  // =========================
  delete(id: string): Observable<any> {

    return this.http.delete(
      `${this.baseUrl}/${id}`
    );

  }

}

// ===================================
// TEACHER RESPONSE MODEL
// ===================================
export interface Teacher {

  id?: string;

  fullName: string;

  gender: string;

  qualification: string;

  experienceYears: number;

  phoneNumber: string;

  salary: number;

  isActive: boolean;

  tenantId?: string;

}

// ===================================
// CREATE TEACHER DTO
// ===================================
export interface CreateTeacher {

  firstName: string;

  lastName: string;

  gender: number;

  dateOfBirth: Date;

  qualification: string;

  experienceYears: number;

  phoneNumber: string;

  address: string;

  joiningDate: Date;

  salary: number;

  userId?: string | null;

}

// ===================================
// UPDATE TEACHER DTO
// ===================================
export interface UpdateTeacher {

  firstName: string;

  lastName: string;

  phoneNumber: string;

  address: string;

  experienceYears: number;

  salary: number;

  isActive: boolean;

}