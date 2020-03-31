import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
    MatDialog, MatDialogModule, MatDialogRef
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ISaveDialogData } from './save-dialog-data.interface';

import { SaveLayoutComponent } from './save-layout.component';

describe('SaveLayoutComponent', () => {
    let saveLayoutComponent: SaveLayoutComponent;
    let saveLayoutDialogRef: MatDialogRef<SaveLayoutComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SaveLayoutComponent
            ],
            imports: [
                HttpClientTestingModule,
                MatFormFieldModule,
                FormsModule,
                MatDialogModule,
                NoopAnimationsModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        const dialog: MatDialog = TestBed.inject(MatDialog);
        saveLayoutDialogRef = dialog.open(SaveLayoutComponent, {
            data: { boxes: [] } as ISaveDialogData
        });
        saveLayoutComponent = saveLayoutDialogRef.componentInstance;
    });

    it('should create', () => {
        expect(saveLayoutComponent instanceof SaveLayoutComponent).toBeTruthy();
    });
});
