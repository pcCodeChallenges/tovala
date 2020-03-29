import { async, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { FirebaseUIModule } from 'firebaseui-angular';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
               AppComponent
            ],
            imports: [
                RouterTestingModule,
                MatDividerModule,
                MatMenuModule,
                MatToolbarModule,
                FirebaseUIModule,
                AngularFireModule.initializeApp(environment.firebaseConfig),
                AngularFireAuthModule
            ]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
