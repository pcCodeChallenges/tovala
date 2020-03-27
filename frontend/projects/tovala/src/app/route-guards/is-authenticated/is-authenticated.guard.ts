import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { User } from 'firebase';
import { Observable, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {

    constructor(private afAuth: AngularFireAuth,
                private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return new Promise<boolean | UrlTree>((resolve, reject) => {
            const authSubscription: Subscription = this.afAuth.authState.subscribe((user: User) => {
                if(user) {
                    resolve(true);
                }
                else {
                    resolve(this.router.createUrlTree(['login'], { replaceUrl: true }));
                }
            });
        });
    }

}
