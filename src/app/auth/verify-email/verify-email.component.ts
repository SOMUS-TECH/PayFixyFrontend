import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router'

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent {

  form: FormGroup
  loading = false

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      token: ['', Validators.required],
    })
  }

  onSubmit() {
    if (this.form.invalid) return
    this.loading = true

    this.authService.verifyEmail(this.form.value).subscribe({
      next: () => {
        this.toastr.success('Email verified successfully!')
        this.router.navigate(['/login'])
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Verification failed')
        this.loading = false
      },
    })
  }

}
