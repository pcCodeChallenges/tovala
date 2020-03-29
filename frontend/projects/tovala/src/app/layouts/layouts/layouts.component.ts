import { Component } from '@angular/core';
import { Box } from '../box/box';

@Component({
    templateUrl: './layouts.component.html',
    styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent {

    constructor() {
    }

    layoutSaved(boxes: Array<Box>): void {
        console.log(`${boxes.length} draggable boxes in the layout`);
    }
}
