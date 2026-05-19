import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private readonly baseUrl =
    `${environment.apiUrl}/attendance`;

  constructor(
    private http: HttpClient
  ) { }

  // GET CLASS ATTENDANCE
  getClassAttendance(
    classId: string,
    date: string
  ): Observable<AttendanceResponse[]> {

    return this.http.get<AttendanceResponse[]>(
      `${this.baseUrl}/class?classId=${classId}&date=${date}`
    );

  }

  // GET STUDENT ATTENDANCE
  getStudentAttendance(
    studentId: string
  ): Observable<AttendanceResponse[]> {

    return this.http.get<AttendanceResponse[]>(
      `${this.baseUrl}/student/${studentId}`
    );

  }

  // MARK ATTENDANCE
  markAttendance(
    data: MarkAttendanceDto
  ): Observable<any> {

    return this.http.post(
      `${this.baseUrl}/mark`,
      data
    );

  }

}

// ============================
// DTOs
// ============================

export interface AttendanceResponse {

  studentId: string;

  studentName: string;

  status: string;

  date: string;

}

export interface StudentAttendanceDto {

  studentId: string;

  status: number;

}

export interface MarkAttendanceDto {

  classId: string;

  date: string;

  students: StudentAttendanceDto[];

}