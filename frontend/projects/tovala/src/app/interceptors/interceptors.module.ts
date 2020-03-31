import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpAuthInterceptor } from './http-auth/http-auth.interceptor';


@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        {
             provide: HTTP_INTERCEPTORS,
             useClass: HttpAuthInterceptor,
             multi: true
         }
    ]
})
export class InterceptorsModule {
}
