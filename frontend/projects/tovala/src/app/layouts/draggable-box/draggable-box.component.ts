import { CdkDrag } from '@angular/cdk/drag-drop';
import {
    AfterViewInit, Component, EventEmitter, HostListener, Input, Output,
    ViewChild
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Box } from '../box/box';
import { IBox } from '../interfaces/box';

@Component({
   selector: 'draggable-box',
   templateUrl: './draggable-box.component.html',
   styleUrls: ['./draggable-box.component.scss']
})
export class DraggableBoxComponent implements AfterViewInit {

    @ViewChild(CdkDrag) cdkDrag: CdkDrag;
    @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;

    @Input() box: Box;
    @Input() loadedSize: { width: number, height: number };
    @Output() remove: EventEmitter<Box> = new EventEmitter<Box>();

    get draggableBox(): IBox {
        return {
            backgroundColor: this.box.backgroundColor,
            topLeft: this.box.topLeft,
            height: this.cdkDrag.element.nativeElement.clientHeight,
            width: this.cdkDrag.element.nativeElement.clientWidth,
        } as IBox;
    }

    set draggableBox(draggableBox: IBox) {
        this.box.backgroundColor = draggableBox.backgroundColor;
        this.box.topLeft = draggableBox.topLeft;
    }

    constructor() {
    }

    ngAfterViewInit(): void {
        if (this.loadedSize) {
            this.cdkDrag.element.nativeElement.style.height = `${this.loadedSize.height}px`;
            this.cdkDrag.element.nativeElement.style.left = `${this.box.topLeft.x}px`;
            this.cdkDrag.element.nativeElement.style.top = `${this.box.topLeft.y}px`;
            this.cdkDrag.element.nativeElement.style.width = `${this.loadedSize.width}px`;
        }
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
