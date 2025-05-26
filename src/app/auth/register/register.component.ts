import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from 'src/app/services/guard/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup
  selectedFile: File | null = null
  loading = false
  error: string | null = null

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      type: ['reader', Validators.required],
    })
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0]
    this.selectedFile = file || null
  }

  onSubmit() {
    if (this.registerForm.invalid) return

    const formData = new FormData()
    for (const key in this.registerForm.value) {
      if (Object.prototype.hasOwnProperty.call(this.registerForm.value, key)) {
        const value = this.registerForm.value[key as keyof typeof this.registerForm.value]
        formData.append(key, value as string)
      }
    }

    if (this.selectedFile) {
      formData.append('photo', this.selectedFile)
    }

    this.loading = true
    this.auth.register(formData).subscribe({
      next: (res) => {
        this.auth.storeUser(res)
        this.router.navigate(['/verify-email'])
      },
      error: (err) => {
        this.error = err.error.message || 'Registration failed'
        this.loading = false
      },
    })
  }
}
