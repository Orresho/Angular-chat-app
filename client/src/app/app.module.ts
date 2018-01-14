import { MessagesService } from './_services/messages/messages.service';
import { NotAuthGuard } from './_guards/notAuth.guard';
import { AuthGuard } from './_guards/auth.guard';
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
import { ProfileInfoComponent } from './components/profile/profile-info/profile-info.component';
import { ProfileEditComponent } from './components/profile/profile-edit/profile-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    MessengerComponent,
    NavbarComponent,
    ProfileInfoComponent,
    ProfileEditComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    FlashMessagesModule
  ],
  providers: [AuthLogService, AuthShared, AuthGuard, NotAuthGuard, MessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
