import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://payfixy-lib-api.onrender.com/api' // Replace with actual

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/login`, credentials)
  }

  storeUser(data: any) {
    localStorage.setItem('token', data.token.token)
    localStorage.setItem('user', JSON.stringify(data.user))
  }

  getToken() {
    return localStorage.getItem('token')
  }

  // getCurrentUser() {
  //   const user = localStorage.getItem('user')
  //   return user ? JSON.parse(user) : null
  // }

  getCurrentUser() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  console.log('Current User:', user); // 🧠 Confirm this returns valid user
  return user;
}
  isLoggedIn(): boolean {
    return !!this.getToken()
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['/login'])
  }

  register(data: FormData) {
    return this.http.post(`${this.apiUrl}/register`, data)
  }

  verifyEmail(data: { token: string }) {
    return this.http.post(`${this.apiUrl}/verify-email`, data)
  }

  resendOtp(data: { email: string }) {
  return this.http.post(`${this.apiUrl}/resend-otp`, data);
}

forgotPassword(data: { email: string }) {
  return this.http.post(`${this.apiUrl}/forgot-password`, data);
}

resetPassword(data: { token: string, newPassword: string }) {
  return this.http.post(`${this.apiUrl}/reset-password`, data);
}

}
