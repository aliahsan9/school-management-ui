import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // =========================================
  // API URL
  // =========================================

  private readonly baseUrl =
    `${environment.apiUrl}/auth`;

  // =========================================
  // Constructor
  // =========================================

  constructor(
    private http: HttpClient
  ) { }

  // =========================================
  // SIGNUP / REGISTER SCHOOL
  // =========================================

  registerSchool(data: RegisterSchoolDto): Observable<any> {

    return this.http.post(
      `${this.baseUrl}/register-school`,
      data
    );

  }

  // =========================================
  // LOGIN
  // =========================================

  login(data: LoginDto): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(
      `${this.baseUrl}/login`,
      data
    );

  }

  // =========================================
  // TOKEN METHODS
  // =========================================

  saveToken(token: string): void {

    localStorage.setItem('token', token);

  }

  getToken(): string | null {

    return localStorage.getItem('token');

  }

  removeToken(): void {

    localStorage.removeItem('token');

  }

  // =========================================
  // USER LOGIN CHECK
  // =========================================

  isLoggedIn(): boolean {

    return !!this.getToken();

  }

  // =========================================
  // LOGOUT
  // =========================================

  logout(): void {

    this.removeToken();

  }

  // =========================================
  // AUTH HEADERS
  // =========================================

  getAuthHeaders(): HttpHeaders {

    const token = this.getToken();

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

  }

}

// =========================================
// DTOs / INTERFACES
// =========================================

export interface RegisterSchoolDto {

  schoolName: string;

  adminName: string;

  email: string;

  password: string;

}

export interface LoginDto {

  email: string;

  password: string;

}

export interface AuthResponse {

  token: string;

  email: string;

  role: string;

  schoolId: number;

}