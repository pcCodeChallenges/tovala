import { HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { FirebaseUIModule } from 'firebaseui-angular';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';

import { HttpAuthInterceptor } from './http-auth.interceptor';

describe('HttpAuthInterceptor', () => {
    let httpAuthInterceptor: HttpAuthInterceptor;

    // Spies
    let httpHandlerSpy: jasmine.SpyObj<HttpHandler>;

    beforeEach(() =>{
        httpHandlerSpy =
            jasmine.createSpyObj('HttpHandler', ['handle']);

        httpHandlerSpy.handle.and.returnValue(of(new HttpResponse()));

        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(environment.firebaseConfig),
                AngularFireAuthModule,
                FirebaseUIModule.forRoot({}),
            ],
            providers: [
                HttpAuthInterceptor,
                { provide: HttpHandler, useValue: httpHandlerSpy }
            ]
        });

        httpAuthInterceptor = TestBed.inject(HttpAuthInterceptor);
    });

    it('should be created', () => {
        expect(httpAuthInterceptor instanceof HttpAuthInterceptor).toBeTruthy();
    });

    describe('intercept', () => {
        it('should add the auth header to the request', (done: DoneFn) => {
            const testHttpRequest: HttpRequest<any> =
                new HttpRequest<any>('GET', 'http://test.com');

            const mockFirebaseUser: firebase.User = <unknown>{
                getIdToken: () => Promise.resolve('1234567890')
            } as firebase.User;
            spyOn(firebase, 'auth')
                .and.returnValue( { currentUser: mockFirebaseUser } as firebase.auth.Auth );

            httpAuthInterceptor.intercept(testHttpRequest, httpHandlerSpy)
                .toPromise().then(() => {
                    const modifiedRequest: HttpRequest<any> =
                        httpHandlerSpy.handle.calls.first().args[0];

                    expect(httpHandlerSpy.handle).toHaveBeenCalled();
                    expect(modifiedRequest.headers.has('Authorization')).toBeTruthy();
            }).then(done).catch(done.fail);
        });
    });
});
