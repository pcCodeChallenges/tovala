import { Component } from '@angular/core';
import { Layout } from '../utilities/layout/layout';

@Component({
    templateUrl: './layouts.component.html',
    styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent {

    window;
    refreshLayouts: boolean;
    loadedLayout: Layout;

    constructor() {
        this.window = window;
        this.window['globalMessage'] = '';
    }

    layoutSaved(): void {
        this.refreshLayouts = !this.refreshLayouts;
    }

    loadLayout(layout: Layout): void {
        this.loadedLayout = layout;
    }
}
