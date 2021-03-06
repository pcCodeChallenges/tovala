import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LayoutCanvasComponent } from '../layout-canvas/layout-canvas.component';
import { LayoutsListComponent } from '../layouts-list/layouts-list.component';

import { LayoutsComponent } from './layouts.component';

describe('LayoutsComponent', () => {
    let component: LayoutsComponent;
    let fixture: ComponentFixture<LayoutsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LayoutCanvasComponent,
                LayoutsComponent,
                LayoutsListComponent
            ],
            imports: [
                HttpClientTestingModule,
                MatDialogModule,
                MatProgressSpinnerModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
