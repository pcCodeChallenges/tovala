import {
    HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { from, Observable } from 'rxjs';
import { mergeAll } from 'rxjs/operators';

/**
 * Append the auth header to every outgoing request
 */
@Injectable({
    providedIn: 'root'
})
export class HttpAuthInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentFirebaseUser: firebase.User = firebase.auth().currentUser;
        if (currentFirebaseUser) {
            return from(currentFirebaseUser.getIdToken(true)
                    .then((authToken: string) => {
                        // Clone the request and set the new header in one step if the auth
                        // header is defined.
                        const authReq: HttpRequest<any> = req.clone({
                            setHeaders: {
                                Authorization: `Bearer ${authToken}`
                            }
                        });

                        return next.handle(authReq);
                    })
            ).pipe(mergeAll());
        }

        return next.handle(req);
    }
}
