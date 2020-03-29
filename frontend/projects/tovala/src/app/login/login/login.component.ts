import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'firebase';
import {
    FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult
} from 'firebaseui-angular';
import { Subscription } from 'rxjs';
import { authTokenKeyName } from '../../interceptors/http-auth/auth-token-key-name';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy, OnInit {
    private authSubscription: Subscription;

    constructor(private afAuth: AngularFireAuth, private router: Router) {
    }

    ngOnInit(): void {
        this.authSubscription = this.afAuth.authState.subscribe((user: User) => {
            if (user) {
                localStorage.setItem(authTokenKeyName, user.refreshToken);
            }
        });
    }

    ngOnDestroy(): void {
        if (this.authSubscription) {
            this.authSubscription.unsubscribe();
        }
    }

    successCallback(data: FirebaseUISignInSuccessWithAuthResult) {
        this.router.navigate(['layouts']);
    }

    errorCallback(data: FirebaseUISignInFailure) {
    }

}
