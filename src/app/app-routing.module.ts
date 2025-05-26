import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { BookFormComponent } from './books/book-form/book-form.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { CheckedOutComponent } from './books/checked-out/checked-out.component';
import { MyCheckoutsComponent } from './checkout/my-checkouts/my-checkouts.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { UnauthorizedComponent } from './error/unauthorized/unauthorized.component';
import { ReaderDashboardComponent } from './dashboards/reader-dashboard/reader-dashboard.component';
import { LibrarianDashboardComponent } from './dashboards/librarian-dashboard/librarian-dashboard.component';
import { AuthGuard } from './services/guard/auth.guard';
import { RoleGuard } from './services/guard/role.guard';
import { LayoutComponent } from './shared/layout/layout.component';

const routes: Routes = [
  // Public (No Layout)
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

  // Layout-based Routes
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'books', pathMatch: 'full' },
      { path: 'books', component: BookListComponent },
      { path: 'books/:id', component: BookDetailsComponent },
      { path: 'book', component: BookFormComponent },
      { path: 'checked-out', component: CheckedOutComponent },
      { path: 'my-checked-out', component: MyCheckoutsComponent },
    ],
  },

  {
    path: 'reader',
    component: LayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'reader' },
    children: [
      { path: '', component: ReaderDashboardComponent },
      { path: 'checkouts', component: MyCheckoutsComponent },
    ],
  },

  {
    path: 'librarian',
    component: LayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'librarian' },
    children: [
      { path: '', component: LibrarianDashboardComponent },
      { path: 'checked-out', component: CheckedOutComponent },
      { path: 'books/new', component: BookFormComponent },
      { path: 'books/:id/edit', component: BookFormComponent },
    ],
  },

  // Errors
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', component: NotFoundComponent },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
