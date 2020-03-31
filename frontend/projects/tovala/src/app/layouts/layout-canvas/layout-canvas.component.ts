import { Point } from '@angular/cdk/drag-drop/drag-ref';
import {
    Component, EventEmitter, Input, OnChanges, Output, QueryList, SimpleChanges,
    ViewChildren
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { Box } from '../box/box';
import { IDimensions } from '../dimensions/dimensions.interface';
import { DraggableBoxComponent } from '../draggable-box/draggable-box.component';
import { IBox } from '../interfaces/box';
import { ISaveDialogData } from '../modals/save-layout/save-dialog-data.interface';
import { SaveLayoutComponent } from '../modals/save-layout/save-layout.component';
import { Layout } from '../utilities/layout/layout';

@Component({
   selector: 'layout-canvas',
   templateUrl: './layout-canvas.component.html',
   styleUrls: ['./layout-canvas.component.scss']
})
export class LayoutCanvasComponent implements OnChanges {
    private static readonly defaultDimensions: IDimensions =
        { topLeft: { x: 5, y: 5 } as Point, height: 75, width: 75 } as IDimensions;

    boxes: Array<Box>;

    @ViewChildren(DraggableBoxComponent) draggableBoxes: QueryList<DraggableBoxComponent>;

    @Input() loadedLayout: Layout;
    @Output() layoutSaved: EventEmitter<Layout> = new EventEmitter<Layout>();

    constructor(private dialog: MatDialog) {
        this.resetLayout();
    }

    /**
     * Unbind the loaded layout as soon as any other action is taken on the
     * in-memory layout
     */
    private unbindLoadedLayout() {
        this.loadedLayout = undefined;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.loadedLayout && changes.loadedLayout.currentValue) {
            this.boxes =
                this.loadedLayout.boxes.map<Box>((box: IBox) =>
                    new Box(box.topLeft, box.backgroundColor));
            this.unbindLoadedLayout();
        }
    }

    addSquare(): void {
        this.unbindLoadedLayout();

        // Create a copy to prevent all boxes from sharing the reference
        // to the same object
        const topLeft: Point =
            Object.assign({}, LayoutCanvasComponent.defaultDimensions.topLeft);

        this.boxes.push(new Box(topLeft));
    }

    resetLayout(): void {
        this.unbindLoadedLayout();
        this.boxes = new Array<Box>();
    }

    saveLayout(): void {
        this.unbindLoadedLayout();
        const savableBoxes: Array<IBox> =
            this.draggableBoxes.map<IBox>((draggableBoxComponent: DraggableBoxComponent) =>
                                              draggableBoxComponent.draggableBox);

        this.dialog.open(SaveLayoutComponent, {
            data: { boxes: savableBoxes } as ISaveDialogData
        }).afterClosed().pipe(first()).toPromise()
            .then((savedLayout: Layout) => {
                if (savedLayout) {
                    window['globalMessage'] = `Layout ${savedLayout.name} was Saved!`;

                    this.layoutSaved.emit(savedLayout)
                }
            });
    }

    removeBox(removedBox: Box): void {
        this.unbindLoadedLayout();
        this.boxes = this.boxes.filter((box: Box) => box.id !== removedBox.id);
    }
}
