import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent {

  verifying = true;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.auth.verifyEmail({ token }).subscribe({
        next: () => {
          this.toastr.success('Email verified!');
          this.router.navigate(['/login']);
        },
        error: () => {
          this.toastr.error('Verification failed');
          this.router.navigate(['/login']);
        },
      });
    } else {
      this.toastr.error('Missing verification token');
      this.router.navigate(['/login']);
    }
  }

}
