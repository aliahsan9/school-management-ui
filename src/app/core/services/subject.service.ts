import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private readonly baseUrl =
    `${environment.apiUrl}/subjects`;

  constructor(
    private http: HttpClient
  ) {}

  // ==============================
  // GET ALL
  // ==============================
  getAll(): Observable<AcademicSubject[]> {
    return this.http.get<AcademicSubject[]>(this.baseUrl);
  }

  // ==============================
  // CREATE
  // ==============================
  create(data: AcademicSubject): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  // ==============================
  // UPDATE
  // ==============================
  update(id: number, data: AcademicSubject): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  // ==============================
  // DELETE
  // ==============================
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

// ==============================
// MODEL (RENAMED - IMPORTANT)
// ==============================
export interface AcademicSubject {
  id?: number;
  name: string;
  classId: number;
  teacherId: number;
}