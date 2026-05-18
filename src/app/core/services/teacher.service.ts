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

  getAll(): Observable<Teacher[]> {

    return this.http.get<Teacher[]>(
      this.baseUrl
    );

  }

  getById(id: number): Observable<Teacher> {

    return this.http.get<Teacher>(
      `${this.baseUrl}/${id}`
    );

  }

  create(data: Teacher): Observable<any> {

    return this.http.post(
      this.baseUrl,
      data
    );

  }

  update(
    id: number,
    data: Teacher
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

export interface Teacher {

  id?: number;

  fullName: string;

  email: string;

  phoneNumber: string;

  qualification: string;

  salary: number;

}