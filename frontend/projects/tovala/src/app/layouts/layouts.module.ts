import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InterceptorsModule } from '../interceptors/interceptors.module';
import { DraggableBoxComponent } from './draggable-box/draggable-box.component';
import { LayoutCanvasComponent } from './layout-canvas/layout-canvas.component';
import { LayoutsListComponent } from './layouts-list/layouts-list.component';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { LayoutsComponent } from './layouts/layouts.component';
import { DeleteLayoutComponent } from './modals/delete-layout/delete-layout.component';
import { SaveLayoutComponent } from './modals/save-layout/save-layout.component';

@NgModule({
    declarations: [
        LayoutCanvasComponent,
        LayoutsListComponent,
        LayoutsComponent,
        DraggableBoxComponent,
        DeleteLayoutComponent,
        SaveLayoutComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        InterceptorsModule,
        LayoutsRoutingModule,
        DragDropModule,
        MatButtonModule,
        MatCardModule,
        MatMenuModule,
        MatDialogModule,
        MatFormFieldModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatTooltipModule,
        MatInputModule
    ]
})
export class LayoutsModule {
}
