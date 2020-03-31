import {
    Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { IDeleteDialogData } from '../modals/delete-layout/delete-dialog-data.interface';
import { DeleteLayoutComponent } from '../modals/delete-layout/delete-layout.component';
import { Layout } from '../utilities/layout/layout';
import { LayoutsService } from '../utilities/layouts/layouts.service';

@Component({
    selector: 'layouts-list',
    templateUrl: './layouts-list.component.html',
    styleUrls: ['./layouts-list.component.scss']
})
export class LayoutsListComponent implements OnChanges, OnInit {
    layouts: Array<Layout>;
    loadingLayouts: boolean;

    @Input() refreshLayouts: boolean = false;
    @Output() loadLayout: EventEmitter<Layout> = new EventEmitter<Layout>();

    constructor(private layoutsService: LayoutsService,
                private dialog: MatDialog) {
    }

    private getLayouts(): Promise<Array<Layout>> {
        // Clear the existing Layouts List as this call
        // pulls all layouts
        this.layouts = undefined;

        this.loadingLayouts = true;

        const requestPromise: Promise<Array<Layout>> =
            this.layoutsService.getLayouts();

        requestPromise.then((layouts: Array<Layout>) => {
            this.layouts = layouts;
        }).finally(() => {
            this.loadingLayouts = false;
        });

        return requestPromise;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.refreshLayouts) {
            // The flag to refresh the list of Layouts has been changed.
            // This is a major hack, but the real solution involves
            // building a datastore in the FE that would send out notifications
            // whenever the list needed to be refreshed, due to newly
            // saved layouts or deleted layouts
            this.getLayouts();
        }
    }

    ngOnInit(): void {
        this.loadingLayouts = false;

        this.getLayouts();
    }

    layoutsTrackByFunc(index: number, layout: Layout): string {
        return layout.id;
    }

    deleteLayout(layout: Layout): void {
        this.dialog.open(DeleteLayoutComponent, {
            data: { layout } as IDeleteDialogData
        }).afterClosed().pipe(first()).toPromise()
            .then((deletedLayout: Layout) => {
                if (deletedLayout) {
                    window['globalMessage'] = `Layout ${deletedLayout.name} was Deleted!`;

                    this.getLayouts()
                }
            });
    }

}
