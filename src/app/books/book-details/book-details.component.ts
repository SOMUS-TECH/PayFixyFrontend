import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {

  book: any;
  loading = true;

  constructor(private route: ActivatedRoute, private bookService: BookService) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.bookService.getBook(bookId).subscribe({
        next: (data) => {
          this.book = data;
          this.loading = false;
        },
        error: () => this.loading = false
      });
    }
  }

}
