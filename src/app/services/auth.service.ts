// src/app/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'https://fakestoreapi.com/auth/login';

  login(credentials: { username: string, password: string }) {
    return this.http.post<{ token: string }>(this.apiUrl, credentials).pipe(
      tap(response => {
        // Armazena o token ao receber
        localStorage.setItem('authToken', response.token);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }
}
