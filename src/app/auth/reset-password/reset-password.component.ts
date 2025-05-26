import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {


  form = this.fb.group({
    token: [''],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form.patchValue({ token: this.route.snapshot.queryParamMap.get('token') });
  }

  onSubmit() {
    const { token, newPassword } = this.form.value

    // Ensure both are strings
    if (!token || !newPassword) {
      this.toastr.error('Token or new password is missing')
      return
    }

    this.auth.resetPassword({ token, newPassword }).subscribe({
      next: () => {
        this.toastr.success('Password reset successful')
        this.router.navigate(['/login'])
      },
      error: () => this.toastr.error('Reset failed'),
    })
  }

}
