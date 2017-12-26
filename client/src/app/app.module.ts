import { RegisterValidationService } from './_services/registerValidation.service';
import { AuthService } from './_services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MessengerComponent } from './components/messenger/messenger.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { routing } from './app.router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    MessengerComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [AuthService, RegisterValidationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
