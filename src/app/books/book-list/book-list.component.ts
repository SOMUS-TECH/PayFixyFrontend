import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: any[] = [];
  searchTerm = '';
  loading = false;

  constructor(
  private bookService: BookService,
  private checkoutService: CheckoutService,
  private auth: AuthService,
  private toastr: ToastrService
) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
  this.loading = true;
  this.bookService.getBooks().subscribe({
    next: (data) => {
      console.log('Books fetched:', data); // DEBUG
      this.books = data;
      this.loading = false;
    },
    error: (err) => {
      console.error('Failed to fetch books:', err); // DEBUG
      this.loading = false;
    }
  });
}


  searchBooks(): void {
    if (this.searchTerm.trim()) {
      this.loading = true;
      this.bookService.searchBooks(this.searchTerm).subscribe({
        next: (data) => {
          this.books = data;
          this.loading = false;
        },
        error: () => this.loading = false
      });
    } else {
      this.fetchBooks();
    }
  }


   isReader(): boolean {
      const user = this.auth.getCurrentUser();
      return user && user.type === 'reader';
    }

//   isReader(): boolean {
//   return true; // Hardcoded for now just to test
// }

  loadBooks() {
    this.bookService.getBooks().subscribe({
      next: (res) => this.books = res,
      error: () => this.toastr.error('Failed to load books')
    });
  }

  checkout(bookId: string) {
    this.checkoutService.checkoutBook(bookId).subscribe({
      next: () => this.toastr.success('Book checked out successfully'),
      error: () => this.toastr.error('Error checking out'),
    });
  }

  search() {
    this.bookService.searchBooks(this.searchTerm).subscribe({
      next: (res) => this.books = res,
      error: () => this.toastr.error('Search failed')
    });
  }


  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/placeholder.jpg';
  }

  isLoggedIn(): boolean {
    return this.auth.getCurrentUser() !== null;
  }
}
