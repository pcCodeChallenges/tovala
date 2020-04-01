import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
    MatDialog, MatDialogModule, MatDialogRef
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IDeleteDialogData } from './delete-dialog-data.interface';

import { DeleteLayoutComponent } from './delete-layout.component';

describe('DeleteLayoutComponent', () => {
    let deleteLayoutComponent: DeleteLayoutComponent;
    let deleteLayoutDialogRef: MatDialogRef<DeleteLayoutComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DeleteLayoutComponent
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
        deleteLayoutDialogRef = dialog.open(DeleteLayoutComponent, {
            data: { layout: {} } as IDeleteDialogData
        });
        deleteLayoutComponent = deleteLayoutDialogRef.componentInstance;
    });

    it('should create', () => {
        expect(deleteLayoutComponent instanceof DeleteLayoutComponent).toBeTruthy();
    });
});
