import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from './components/auth/register/register.component';
import { MessengerComponent } from './components/messenger/messenger.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/auth/login/login.component';

const rootRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'messenger', component: MessengerComponent},
    {path: 'profile', component: ProfileComponent},
    
];

export const routing = RouterModule.forRoot(rootRoutes);
