import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  loading = false;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    if (this.form.invalid) return;

    this.loading = true;

    this.auth.forgotPassword(this.form.value as { email: string }).subscribe({
      next: () => {
        this.toastr.success('Password reset link sent to your email')
        this.form.reset()
        this.loading = false
      },
      error: () => {
        this.toastr.error('Error sending reset link')
        this.loading = false
      },
    })
  }
}
