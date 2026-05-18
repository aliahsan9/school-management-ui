import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly baseUrl =
    `${environment.apiUrl}/students`;

  constructor(
    private http: HttpClient
  ) { }

  // ==============================
  // GET ALL
  // ==============================

  getAll(): Observable<Student[]> {

    return this.http.get<Student[]>(
      this.baseUrl
    );

  }

  // ==============================
  // GET BY ID
  // ==============================

  getById(id: number): Observable<Student> {

    return this.http.get<Student>(
      `${this.baseUrl}/${id}`
    );

  }

  // ==============================
  // CREATE
  // ==============================

  create(data: Student): Observable<any> {

    return this.http.post(
      this.baseUrl,
      data
    );

  }

  // ==============================
  // UPDATE
  // ==============================

  update(
    id: number,
    data: Student
  ): Observable<any> {

    return this.http.put(
      `${this.baseUrl}/${id}`,
      data
    );

  }

  // ==============================
  // DELETE
  // ==============================

  delete(id: number): Observable<any> {

    return this.http.delete(
      `${this.baseUrl}/${id}`
    );

  }

}

// ==============================
// MODEL
// ==============================

export interface Student {

  id?: number;

  firstName: string;

  lastName: string;

  gender: string;

  dateOfBirth: Date;

  phoneNumber: string;

  address: string;

  classId: number;

}