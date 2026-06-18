import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../auth.service";


@Injectable({ providedIn: 'root' }) 
export class AuthGuard implements CanActivate {
    router = inject(Router);
    authService = inject(AuthService);

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {

        if (this.authService.getUser()) 
            return true;
        else 
            this.router.navigate(['login'], {
                queryParams: {returnUrl: state.url}
            })

        return false;
    }
}