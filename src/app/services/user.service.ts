import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userKey :any
  private tokenKey : any

  constructor() {}

  // Save user and token to localStorage
  storeUser(user: any, token: string) {
    localStorage.setItem(this.userKey, JSON.stringify(user))
    localStorage.setItem(this.tokenKey, token)
  }

  // Get user from localStorage
  getCurrentUser(): any | null {
    const userJson = localStorage.getItem(this.userKey)
    return userJson ? JSON.parse(userJson) : null
  }

  // Get auth token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey)
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken()
  }

  // Logout and clear storage
  logout(): void {
    localStorage.removeItem(this.userKey)
    localStorage.removeItem(this.tokenKey)
  }
}
