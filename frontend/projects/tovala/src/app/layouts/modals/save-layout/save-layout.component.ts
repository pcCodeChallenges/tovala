import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ILayout } from '../../interfaces/layout';
import { Layout } from '../../utilities/layout/layout';
import { LayoutsService } from '../../utilities/layouts/layouts.service';
import { ISaveDialogData } from './save-dialog-data.interface';

@Component({
   templateUrl: './save-layout.component.html',
   styleUrls: ['./save-layout.component.scss']
})
export class SaveLayoutComponent implements OnInit {
    error: string;
    layout: ILayout;

    constructor(private layoutsService: LayoutsService,
                private matDialogRef: MatDialogRef<SaveLayoutComponent>,
                @Inject(MAT_DIALOG_DATA) public data: ISaveDialogData) {
    }

    ngOnInit(): void {
        this.layout = {
            name: '',
            boxes: this.data.boxes
        } as ILayout;
    }

    saveLayout(): void {
        this.layoutsService.saveLayout(this.layout)
            .then((savedLayout: Layout) => this.matDialogRef.close(savedLayout))
            .catch((error: HttpErrorResponse) => {
                this.error = error.message;
            });
    }

}
