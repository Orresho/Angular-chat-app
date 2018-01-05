import { AuthLogService } from './../_services/authentication/auth-log.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    redirectUrl;

    constructor(
        private authLogService: AuthLogService,
        private router: Router
    ) { }

    canActivate(
        router: ActivatedRouteSnapshot,
        state: RouterStateSnapshot)
        
        {

        // Checks if user is logged in
        if (this.authLogService.loggedIn()) {
            
            // user is authorized to view this route
            return true;
        } else {

            // Store snapshot of users initial url request to a property
            this.redirectUrl = state.url;

            //navigate to home page
            this.router.navigate(['/login']);

            // user is not authorized to view this route
            return false;
        
        }

    }
}