import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private readonly baseUrl =
    `${environment.apiUrl}/payments`;

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Payment[]> {

    return this.http.get<Payment[]>(
      this.baseUrl
    );

  }

  create(data: Payment): Observable<any> {

    return this.http.post(
      this.baseUrl,
      data
    );

  }

}

export interface Payment {

  id?: number;

  feeId: number;

  amountPaid: number;

  paymentDate: Date;

  paymentMethod: string;

}