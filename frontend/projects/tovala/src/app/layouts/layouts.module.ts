import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutCanvasComponent } from './layout-canvas/layout-canvas.component';
import { LayoutsListComponent } from './layouts-list/layouts-list.component';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { LayoutsComponent } from './layouts/layouts.component';


@NgModule({
    declarations: [
        LayoutCanvasComponent,
        LayoutsListComponent,
        LayoutsComponent
    ],
    imports: [
        CommonModule,
        LayoutsRoutingModule
    ]
})
export class LayoutsModule {
}
