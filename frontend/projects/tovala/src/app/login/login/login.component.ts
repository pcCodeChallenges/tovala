import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy, OnInit {
    private authSubscription: Subscription;

    constructor(private afAuth: AngularFireAuth, private router: Router) {
    }

    ngOnInit(): void {
        this.authSubscription = this.afAuth.authState.subscribe(d => console.log(d));
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
