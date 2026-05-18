import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private readonly baseUrl =
    `${environment.apiUrl}/classes`;

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<ClassModel[]> {

    return this.http.get<ClassModel[]>(
      this.baseUrl
    );

  }

  create(data: ClassModel): Observable<any> {

    return this.http.post(
      this.baseUrl,
      data
    );

  }

  update(
    id: number,
    data: ClassModel
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

export interface ClassModel {

  id?: number;

  name: string;

  section: string;

  teacherId: number;

}