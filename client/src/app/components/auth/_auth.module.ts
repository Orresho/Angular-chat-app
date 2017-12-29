import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

@NgModule({
    declarations: [
        RegisterComponent,
        LoginComponent,
        AuthComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        HttpModule
    ],
})
export class AuthModule { }