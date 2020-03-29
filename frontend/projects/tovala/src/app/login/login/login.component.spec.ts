import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { firebase, firebaseui, FirebaseUIModule } from 'firebaseui-angular';
import { environment } from '../../../environments/environment';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
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

        TestBed.configureTestingModule({
            declarations: [
                LoginComponent
            ],
            imports: [
                RouterTestingModule,
                FirebaseUIModule.forRoot(firebaseUiAuthConfig),
                AngularFireModule.initializeApp(environment.firebaseConfig),
                AngularFireAuthModule,
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
