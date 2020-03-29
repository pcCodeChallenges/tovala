import {
    HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { authTokenKeyName } from './auth-token-key-name';

/**
 * Append the auth header to every outgoing request
 */
@Injectable({
    providedIn: 'root'
})
export class HttpAuthInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Retrieve the auth header value from the UserAuthentication Service
        const authHeader: string = localStorage.getItem(authTokenKeyName);

        // Clone the request and set the new header in one step if the auth
        // header is defined.
        const authReq: HttpRequest<any> =  authHeader ? req.clone({
            setHeaders: {
                Authorization: authHeader
            }
        }) : req;

        return next.handle(authReq);
    }
}
