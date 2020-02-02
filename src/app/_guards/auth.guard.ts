import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AlertService,AuthenticationService } from '../_services';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,private alertService: AlertService, 
        private authenticationService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.alertService.error('You must login first', true);
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}