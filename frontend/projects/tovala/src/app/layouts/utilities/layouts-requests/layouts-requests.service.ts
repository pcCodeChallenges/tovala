import {
    HttpClient, HttpErrorResponse, HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ILayout } from '../../interfaces/layout';
import { ISingleLayout } from '../../interfaces/single-layout';
import { ILayouts } from '../api-interfaces/layouts';
import { ApiPaths } from '../api-paths';
import { Layout } from '../layout/layout';

@Injectable({
    providedIn: 'root'
})
export class LayoutsRequestsService {

    constructor(private httpClient: HttpClient) {
    }

    deleteLayout(layoutId: string): Observable<Layout> {
        const httpParams =  {
            params: new HttpParams( {
                fromObject: {
                    id: layoutId
                }
            })
        };

        return this.httpClient.delete<ISingleLayout>(ApiPaths.deleteLayout, httpParams)
            .pipe(
                map<ISingleLayout, Layout>((singleLayout: ISingleLayout) => new Layout(singleLayout.layout)),
                catchError((error: HttpErrorResponse) => { throw error; })
            );
    }

    getLayouts(): Observable<Array<Layout>> {
        return this.httpClient.get<ILayouts>(ApiPaths.getLayouts)
            .pipe(
                map<ILayouts, Array<Layout>>((beLayouts: ILayouts) =>
                    beLayouts.layouts.map((beLayout: ILayout) => new Layout(beLayout))),
                catchError((error: HttpErrorResponse) => { throw error; })
            );
    }

    saveLayout(saveLayoutParams: ILayout): Observable<Layout> {
        return this.httpClient.post<ISingleLayout>(ApiPaths.saveLayout, saveLayoutParams)
            .pipe(
                map<ISingleLayout, Layout>((singleLayout: ISingleLayout) => new Layout(singleLayout.layout)),
                catchError((error: HttpErrorResponse) => { throw error; })
            );
    }
}
