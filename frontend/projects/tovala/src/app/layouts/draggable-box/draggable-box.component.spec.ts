import { DragDropModule } from '@angular/cdk/drag-drop';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

import { DraggableBoxComponent } from './draggable-box.component';

describe('DraggableBoxComponent', () => {
    let component: DraggableBoxComponent;
    let fixture: ComponentFixture<DraggableBoxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DraggableBoxComponent
            ],
            imports: [
                DragDropModule,
                MatButtonModule,
                MatCardModule,
                MatMenuModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DraggableBoxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
