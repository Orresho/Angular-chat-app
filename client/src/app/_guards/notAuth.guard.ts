import { AuthLogService } from './../_services/authentication/auth-log.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class NotAuthGuard implements CanActivate {

    constructor(
        private authLogService: AuthLogService,
        private router: Router
    ) { }

    canActivate() {

        // Checks if user is logged in
        if (this.authLogService.loggedIn()) {
            
            // Navigate to home page
            this.router.navigate(['/home']);
            
            // User is not authorized to view this route
            return false;
        } else {

            // User is authorized to view this route
            return true;
        
        }

    }
}