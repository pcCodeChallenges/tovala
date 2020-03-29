import { Point } from '@angular/cdk/drag-drop/drag-ref';
import {
    Component, EventEmitter, OnInit, Output, QueryList, ViewChildren
} from '@angular/core';
import { Box } from '../box/box';
import { IDimensions } from '../dimensions/dimensions.interface';
import { DraggableBoxComponent } from '../draggable-box/draggable-box.component';

@Component({
   selector: 'layout-canvas',
   templateUrl: './layout-canvas.component.html',
   styleUrls: ['./layout-canvas.component.scss']
})
export class LayoutCanvasComponent implements OnInit {
    private static readonly defaultDimensions: IDimensions =
        { topLeft: { x: 5, y: 5 } as Point, height: 75, width: 75 } as IDimensions;

    boxes: Array<Box>;

    @ViewChildren(DraggableBoxComponent) draggableBoxes:  QueryList<DraggableBoxComponent>;

    @Output() layoutUpdated: EventEmitter<Array<Box>> =
        new EventEmitter<Array<Box>>();

    constructor() {
        this.resetLayout();
    }

    ngOnInit(): void {
    }

    addSquare(): void {
        this.boxes.push(new Box(LayoutCanvasComponent.defaultDimensions.topLeft));
    }

    resetLayout(): void {
        this.boxes = new Array<Box>();
    }

    saveLayout() {
        console.log('DraggableBoxComponents count', this.draggableBoxes.length);
    }

    removeBox(removedBox: Box) {
        this.boxes = this.boxes.filter((box: Box) => box.id !== removedBox.id);
    }
}
