import { Point } from '@angular/cdk/drag-drop/drag-ref';

export class Box {
    private static NextBoxId: number = 0;

    // Unique Identifier for this box object
    id: number;

    backgroundColor: string;
    topLeft: Point;

    constructor(topLeft: Point, backgroundColor?: string) {
        // Create a "unique" Id for each box
        // This format allows for a maximum of
        // ~9 quadrillion (based upon the
        // IEEE 754 spec). So I think this will
        // be a safe option
        this.id = ++Box.NextBoxId;

        // Hex Color algorithm pilfered from
        // https://dev.to/akhil_001/generating-random-color-with-single-line-of-js-code-fhj
        this.backgroundColor = backgroundColor ? backgroundColor :
            '#'+Math.floor(Math.random()*16777215).toString(16);

        this.topLeft = topLeft;
    }

    calculateNewPosition(distance: Point) {
        this.topLeft.x += distance.x;
        this.topLeft.y += distance.y;
    }
}
