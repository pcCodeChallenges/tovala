import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FirebaseUIModule } from 'firebaseui-angular';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';


@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        FirebaseUIModule,
        MatButtonModule
    ]
})
export class LoginModule {
}
