import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

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

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl);
  }

  getStudentById(id: string): Observable<Student> {
    return this.http.get<Student>(
      `${this.baseUrl}/${id}`
    );
  }

  createStudent(data: any): Observable<any> {
    return this.http.post(
      this.baseUrl,
      data
    );
  }

  updateStudent(
    id: string,
    data: any
  ): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${id}`,
      data
    );
  }

  deleteStudent(id: string): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/${id}`
    );
  }
}
export interface Student {
  id: string;

  admissionNumber: string;

  firstName: string;

  lastName: string;

  gender: number;

  dateOfBirth: string;

  fatherName: string;

  motherName: string;

  phoneNumber: string;

  address: string;

  admissionDate: string;

  isActive: boolean;

  tenantId: string;
}