import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  loginForm: FormGroup
  errorMessage = ''

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  onSubmit() {
    if (this.loginForm.invalid) return

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.authService.storeUser(res)
        const user = res.user

        if (user.type === 'reader') {
          this.router.navigate(['/books'])
        } else if (user.type === 'librarian') {
          this.router.navigate(['/books'])
        } else {
          this.router.navigate(['/unauthorized'])
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Login failed'
      },
    })
  }

}
