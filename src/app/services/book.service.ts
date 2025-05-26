import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service'; // Ensure you have access to token here

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = 'https://payfixy-lib-api.onrender.com/api/books';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getAuthHeaders() {
    const token = this.auth.getToken(); // or auth.getCurrentUser().token
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getBooks() {
    return this.http.get<any[]>(this.baseUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  addBook(bookFormData: FormData) {
    return this.http.post(this.baseUrl, bookFormData, {
      headers: this.getAuthHeaders(),
    });
  }

  checkoutBook(id: string) {
    return this.http.post(
      `${this.baseUrl}/books/${id}/checkout`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }

  getBook(id: string) {
    return this.http.get<any>(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  searchBooks(query: string) {
    return this.http.get<any[]>(`${this.baseUrl}/search?q=${query}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getCheckedOutBooks() {
    return this.http.get<any[]>(`${this.baseUrl}/books/checked-out`, {
      headers: this.getAuthHeaders(),
    });
  }
}
