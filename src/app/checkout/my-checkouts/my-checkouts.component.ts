import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-checkouts',
  templateUrl: './my-checkouts.component.html',
  styleUrls: ['./my-checkouts.component.scss']
})
export class MyCheckoutsComponent {

  checkouts: any = [];

  constructor(
    private checkoutService: CheckoutService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadCheckouts();
  }

  loadCheckouts() {
    this.checkoutService.getMyCheckouts().subscribe({
      next: (res) => this.checkouts = res,
      error: () => this.toastr.error('Could not fetch checkouts')
    });
  }

  checkin(bookId: string) {
    this.checkoutService.checkinBook(bookId).subscribe({
      next: () => {
        this.toastr.success('Book returned');
        this.loadCheckouts();
      },
      error: () => this.toastr.error('Return failed'),
    });
  }

}
