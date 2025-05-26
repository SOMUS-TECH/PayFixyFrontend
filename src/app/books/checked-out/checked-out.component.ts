import { Component, OnInit } from '@angular/core'
import { BookService } from '../../services/book.service'

@Component({
  selector: 'app-checked-out',
  templateUrl: './checked-out.component.html',
  styleUrls: ['./checked-out.component.scss'],
})
export class CheckedOutComponent implements OnInit {
  checkedOutBooks: any[] = []
  loading = false

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.fetchCheckedOutBooks()
  }

  fetchCheckedOutBooks(): void {
    this.loading = true
    this.bookService.getCheckedOutBooks().subscribe({
      next: (res) => {
        this.checkedOutBooks = res
        this.loading = false
      },
      error: (err) => {
        console.error('Failed to fetch checked out books', err)
        this.loading = false
      },
    })
  }

  daysRemaining(expected: string): string {
    const due = new Date(expected)
    const now = new Date()
    const diff = Math.floor((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return diff >= 0 ? `${diff} day(s) left` : `${Math.abs(diff)} day(s) overdue`
  }
}
