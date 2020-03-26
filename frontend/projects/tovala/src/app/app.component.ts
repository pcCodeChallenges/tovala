import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
    private authSubscription: Subscription;

    user: User;

    constructor(private afAuth: AngularFireAuth,
                private router: Router) {
    }

    ngOnInit(): void {
        this.authSubscription = this.afAuth.authState.subscribe((user: User) => {
            this.user = user;
        });
    }

    ngOnDestroy(): void {
        if (this.authSubscription) {
            this.authSubscription.unsubscribe();
        }
    }

    logout() {
        this.afAuth.auth.signOut().finally(() => {
            // Irrespective of whether or not the logout succeeds
            // clear the user object
            this.user = undefined;
        });

        this.router.navigate(['login']);
    }

}
