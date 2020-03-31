import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { LayoutCanvasComponent } from './layout-canvas.component';

describe('LayoutCanvasComponent', () => {
    let component: LayoutCanvasComponent;
    let fixture: ComponentFixture<LayoutCanvasComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LayoutCanvasComponent
            ],
            imports: [
                MatDialogModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutCanvasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
