import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
    FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult
} from 'firebaseui-angular';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    constructor(private router: Router) {
    }

    successCallback(data: FirebaseUISignInSuccessWithAuthResult) {
        this.router.navigate(['layouts']);
    }

    errorCallback(data: FirebaseUISignInFailure) {
    }

}
