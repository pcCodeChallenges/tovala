import { Point } from '@angular/cdk/drag-drop/drag-ref';
import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Box } from '../box/box';

@Component({
   selector: 'draggable-box',
   templateUrl: './draggable-box.component.html',
   styleUrls: ['./draggable-box.component.scss']
})
export class DraggableBoxComponent implements OnChanges, OnInit {

    boxBackgroundColor: string;
    initialPoint: Point;

    @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;

    @Input() box: Box;
    @Output() remove: EventEmitter<Box> = new EventEmitter<Box>();

    constructor() {
    }

    @HostListener('contextmenu', ['$event'])
    onContextMenu(event) {
        event.preventDefault();

        this.menuTrigger.openMenu();
    }

    ngOnChanges(changesObj: SimpleChanges): void {
        if (changesObj.box && changesObj.box.currentValue) {
            this.initialPoint = this.box.topLeft;
        }
    }

    ngOnInit(): void {
        // Hex Color algorithm pilfered from
        // https://dev.to/akhil_001/generating-random-color-with-single-line-of-js-code-fhj
        this.box.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    }

    boxDragEnd(event): void {
        this.box.calculateNewPosition(event.distance);
    }

    removeBox(): void {
        this.remove.emit(this.box);
    }
}
