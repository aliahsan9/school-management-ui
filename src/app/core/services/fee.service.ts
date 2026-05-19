import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeeService {

  private readonly baseUrl = `${environment.apiUrl}/fees`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<FeeResponse[]> {
    return this.http.get<FeeResponse[]>(this.baseUrl);
  }

  create(data: CreateFee): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  getById(id: string): Observable<FeeResponse> {
    return this.http.get<FeeResponse>(`${this.baseUrl}/${id}`);
  }
}

/* ================= DTOs ================= */

export interface CreateFee {
  studentId: string;
  title: string;
  amount: number;
  dueDate: string;
}

export interface FeeResponse {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  amount: number;
  paidAmount: number;
  remainingAmount: number;
  status: string;
  dueDate: string;
}