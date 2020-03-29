import { CdkDrag } from '@angular/cdk/drag-drop';
import { Point } from '@angular/cdk/drag-drop/drag-ref';
import {
    Component, EventEmitter, HostListener, Input, OnChanges, Output,
    SimpleChanges, ViewChild
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Box } from '../box/box';
import { IDraggableBox } from '../draggable-box.interface';

@Component({
   selector: 'draggable-box',
   templateUrl: './draggable-box.component.html',
   styleUrls: ['./draggable-box.component.scss']
})
export class DraggableBoxComponent {

    @ViewChild(CdkDrag) cdkDrag: CdkDrag;
    @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;

    @Input() box: Box;
    @Output() remove: EventEmitter<Box> = new EventEmitter<Box>();

    get draggableBox(): IDraggableBox {
        return {
            backgroundColor: this.box.backgroundColor,
            topLeft: this.box.topLeft,
            height: this.cdkDrag.element.nativeElement.clientHeight,
            width: this.cdkDrag.element.nativeElement.clientWidth,
        } as IDraggableBox;
    }

    set draggableBox(draggableBox: IDraggableBox) {
        this.box.backgroundColor = draggableBox.backgroundColor;
        this.box.topLeft = draggableBox.topLeft;
    }

    constructor() {
    }

    @HostListener('contextmenu', ['$event'])
    onContextMenu(event) {
        event.preventDefault();

        this.menuTrigger.openMenu();
    }

    boxDragEnd(event): void {
        this.box.calculateNewPosition(event.distance);
    }

    removeBox(): void {
        this.remove.emit(this.box);
    }
}
