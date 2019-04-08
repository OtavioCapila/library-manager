import { AuthGuard } from './shared/auth/auth-guard.service';
import { AuthService } from './shared/auth/auth.service';
import { ModalGiveBookToUserComponent } from './components/modal-give-book-to-user/modal-give-book-to-user.component';
import { InterceptorModule } from './middleware/interceptor.module';
import { RegisterComponent } from './components/register/register.component';
import { TokenService } from './shared/token.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ServerService } from './shared/server.service';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ToastrModule } from 'ngx-toastr';
import { LibraryComponent } from './components/library/library.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LibraryComponent,
    NavbarComponent,
    ModalGiveBookToUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    InterceptorModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    FormsModule,
    HttpClientModule,
    MatDialogModule,
  ],
  entryComponents: [ModalGiveBookToUserComponent],
  providers: [ServerService, CookieService, TokenService, AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
