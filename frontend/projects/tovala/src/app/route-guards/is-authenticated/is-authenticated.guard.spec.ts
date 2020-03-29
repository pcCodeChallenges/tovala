import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '../../../environments/environment';

import { IsAuthenticatedGuard } from './is-authenticated.guard';

describe('IsAuthenticatedGuard', () => {
    let guard: IsAuthenticatedGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                AngularFireModule.initializeApp(environment.firebaseConfig),
                AngularFireAuthModule
            ]
        });

        guard = TestBed.inject(IsAuthenticatedGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
