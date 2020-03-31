import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LayoutsService } from '../../utilities/layouts/layouts.service';
import { IDeleteDialogData } from './delete-dialog-data.interface';

@Component({
   templateUrl: './delete-layout.component.html',
   styleUrls: ['./delete-layout.component.scss']
})
export class DeleteLayoutComponent {
    error: string;

    constructor(private layoutsService: LayoutsService,
                private matDialogRef: MatDialogRef<DeleteLayoutComponent>,
                @Inject(MAT_DIALOG_DATA) public data: IDeleteDialogData) {
    }

    deleteLayout(): void {
        this.layoutsService.deleteLayout(this.data.layout.id)
            .then(() => this.matDialogRef.close(this.data.layout))
            .catch((error: HttpErrorResponse) => {
                this.error = error.message;
            });
    }
}
