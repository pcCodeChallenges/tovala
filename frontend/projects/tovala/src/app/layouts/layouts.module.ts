import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { DraggableBoxComponent } from './draggable-box/draggable-box.component';
import { LayoutCanvasComponent } from './layout-canvas/layout-canvas.component';
import { LayoutsListComponent } from './layouts-list/layouts-list.component';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { LayoutsComponent } from './layouts/layouts.component';

@NgModule({
    declarations: [
        LayoutCanvasComponent,
        LayoutsListComponent,
        LayoutsComponent,
        DraggableBoxComponent
    ],
    imports: [
        CommonModule,
        LayoutsRoutingModule,
        DragDropModule,
        MatButtonModule,
        MatCardModule,
        MatMenuModule
    ]
})
export class LayoutsModule {
}
