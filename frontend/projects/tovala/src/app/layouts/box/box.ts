import { Point } from '@angular/cdk/drag-drop/drag-ref';
import { IDimensions } from '../dimensions/dimensions.interface';

export class Box implements IDimensions {
    private static NextBoxId: number = 0;

    // Unique Identifier for this box object
    id: number;

    backgroundColor: string;
    height: number;
    topLeft: Point;
    width: number;

    get serializedConfig(): string {
        return JSON.stringify({
            backgroundColor: this.backgroundColor,
            height: this.height,
            topLeft: this.topLeft,
            width: this.width
        });
    }

    constructor(dimensions? :IDimensions) {
        Object.assign(this, dimensions);

        // Create a "unique" Id for each box
        // This format allows for a maximum of
        // ~9 quadrillion (based upon the
        // IEEE 754 spec). So I think this will
        // be a safe option
        this.id = ++Box.NextBoxId;
    }

    calculateNewPosition(distance: Point) {
        this.topLeft.x += distance.x;
        this.topLeft.y += distance.y;
    }
}
