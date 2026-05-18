
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeeService {

  private readonly baseUrl =
    `${environment.apiUrl}/fees`;

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Fee[]> {

    return this.http.get<Fee[]>(
      this.baseUrl
    );

  }

  create(data: Fee): Observable<any> {

    return this.http.post(
      this.baseUrl,
      data
    );

  }

  update(
    id: number,
    data: Fee
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

export interface Fee {

  id?: number;

  studentId: number;

  amount: number;

  dueDate: Date;

  status: string;

}