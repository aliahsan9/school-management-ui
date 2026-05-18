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

  getAll(): Observable<Attendance[]> {

    return this.http.get<Attendance[]>(
      this.baseUrl
    );

  }

  markAttendance(
    data: Attendance
  ): Observable<any> {

    return this.http.post(
      this.baseUrl,
      data
    );

  }

}

export interface Attendance {

  id?: number;

  studentId: number;

  date: Date;

  status: string;

}