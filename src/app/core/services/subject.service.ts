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
  ) { }

  getAll(): Observable<Subject[]> {

    return this.http.get<Subject[]>(
      this.baseUrl
    );

  }

  create(data: Subject): Observable<any> {

    return this.http.post(
      this.baseUrl,
      data
    );

  }

  update(
    id: number,
    data: Subject
  ): Observable<any> {

    return this.http.put(
      `${this.baseUrl}/${id}`,
      data
    );

  }

  delete(id: number): Observable<any> {

    return this.http.delete(
      `${this.baseUrl}/${id}`
    );

  }

}

export interface Subject {

  id?: number;

  name: string;

  classId: number;

  teacherId: number;

}