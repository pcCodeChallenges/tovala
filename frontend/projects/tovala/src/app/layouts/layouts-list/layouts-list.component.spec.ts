import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LayoutsListComponent } from './layouts-list.component';

describe('LayoutsListComponent', () => {
    let layoutsListComponent: LayoutsListComponent;
    let fixture: ComponentFixture<LayoutsListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
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
        fixture = TestBed.createComponent(LayoutsListComponent);
        layoutsListComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(layoutsListComponent instanceof LayoutsListComponent).toBeTruthy();
    });
});
