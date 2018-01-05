import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from './components/auth/register/register.component';
import { MessengerComponent } from './components/messenger/messenger.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuard } from "./_guards/auth.guard";
import { NotAuthGuard } from "./_guards/notAuth.guard";

const rootRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent, canActivate: [NotAuthGuard]},
    {path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard]},
    {path: 'messenger', component: MessengerComponent, canActivate: [AuthGuard]},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    
];

export const routing = RouterModule.forRoot(rootRoutes);
