import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private baseUrl = 'https://payfixy-lib-api.onrender.com/api';

  constructor(private http: HttpClient) {}

  checkoutBook(bookId: string) {
    return this.http.post(`${this.baseUrl}/books/${bookId}/checkout`, {});
  }

  checkinBook(bookId: string) {
    return this.http.post(`${this.baseUrl}/books/${bookId}/checkin`, {});
  }

  getCheckedOutBooks() {
    return this.http.get(`${this.baseUrl}/books/checked-out`);
  }

  // getMyCheckouts() {
  //   return this.http.get(`${this.baseUrl}/reader/checkouts`);
  // }

  getMyCheckouts() {
  return this.http.get<any[]>(`${this.baseUrl}/books/checked-out`)
}


}
