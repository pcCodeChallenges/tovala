import { Injectable } from '@angular/core';
import { ILayout } from '../../interfaces/layout';
import { Layout } from '../layout/layout';
import { LayoutsRequestsService } from '../layouts-requests/layouts-requests.service';

@Injectable({
    providedIn: 'root'
})
export class LayoutsService {

    constructor(private layoutsRequestsService: LayoutsRequestsService) {
    }

    deleteLayout(layoutId: string): Promise<Layout> {
        return this.layoutsRequestsService.deleteLayout(layoutId).toPromise();
    }

    getLayouts(): Promise<Array<Layout>> {
        return this.layoutsRequestsService.getLayouts().toPromise();
    }

    saveLayout(saveLayoutParams: ILayout): Promise<Layout> {
        return this.layoutsRequestsService.saveLayout(saveLayoutParams).toPromise();
    }
}
