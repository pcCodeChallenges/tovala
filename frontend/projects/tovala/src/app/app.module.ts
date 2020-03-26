import { NgModule } from '@angular/core';


import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// currently there is a bug while building the app with --prod
// - https://github.com/RaphaelJenni/FirebaseUI-Angular/issues/76
// the plugin exposes the two libraries as well. You can use those:
import { firebase, firebaseui, FirebaseUIModule } from 'firebaseui-angular';


import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
    signInFlow: 'popup',
    signInOptions: [
        {
            requireDisplayName: true,
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
        },
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        FirebaseUIModule.forRoot(firebaseUiAuthConfig),
        MatToolbarModule,
        MatDividerModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
