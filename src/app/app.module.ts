import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ReaderComponent } from './dashboard/reader/reader.component';
import { LibrarianComponent } from './dashboard/librarian/librarian.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { BookFormComponent } from './books/book-form/book-form.component';
import { CheckedOutComponent } from './books/checked-out/checked-out.component';
import { MyCheckoutsComponent } from './checkout/my-checkouts/my-checkouts.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { NotificationComponent } from './shared/notification/notification.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { UnauthorizedComponent } from './error/unauthorized/unauthorized.component';
import { ReaderDashboardComponent } from './dashboards/reader-dashboard/reader-dashboard.component';
import { LibrarianDashboardComponent } from './dashboards/librarian-dashboard/librarian-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailVerificationComponent } from './auth/email-verification/email-verification.component';
import { TopbarComponent } from './shared/topbar/topbar.component';
import { LayoutComponent } from './shared/layout/layout.component'
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ReaderComponent,
    LibrarianComponent,
    BookListComponent,
    BookDetailsComponent,
    BookFormComponent,
    CheckedOutComponent,
    MyCheckoutsComponent,
    NavbarComponent,
    SidebarComponent,
    LoaderComponent,
    NotificationComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    ReaderDashboardComponent,
    LibrarianDashboardComponent,
    EmailVerificationComponent,
    TopbarComponent,
    LayoutComponent,
    BookListComponent,
    SidebarComponent,
    BookFormComponent,
    CheckedOutComponent,
    MyCheckoutsComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),  // Add this line
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
