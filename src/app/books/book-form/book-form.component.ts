import { Component } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { BookService } from 'src/app/services/book.service'

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent {


  form: FormGroup
  coverFile?: File

  constructor(private fb: FormBuilder, private bookService: BookService) {
    this.form = this.fb.group({
      title: [''],
      isbn: [''],
      revision_number: [''],
      published_date: [''],
      publisher: [''],
      authors: [''],
      genre: [''],
    })
  }

  onFileSelected(event: any) {
    this.coverFile = event.target.files[0]
  }

  submit() {
    const formData = new FormData()
    Object.keys(this.form.value).forEach((key) => {
      formData.append(key, this.form.value[key])
    })
    if (this.coverFile) formData.append('cover_image', this.coverFile)

    this.bookService.addBook(formData).subscribe({
      next: (res) => alert('Book saved!'),
      error: (err) => console.error(err),
    })
  }
  
}
