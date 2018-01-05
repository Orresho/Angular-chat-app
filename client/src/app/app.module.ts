import { AuthShared } from './_services/authentication/auth-shared.service';
import { AuthLogService } from './_services/authentication/auth-log.service';
import { AuthModule } from './components/auth/_auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MessengerComponent } from './components/messenger/messenger.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { routing } from './app.router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    MessengerComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [AuthLogService, AuthShared],
  bootstrap: [AppComponent]
})
export class AppModule { }
