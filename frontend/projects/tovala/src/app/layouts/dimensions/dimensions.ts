import { Point } from '@angular/cdk/drag-drop/drag-ref';
import { IDimensions } from './dimensions.interface';

export class Dimensions implements IDimensions {
    height: number;
    topLeft: Point;
    width: number;

    constructor(height: number, topLeft: Point, width: number) {
        Object.assign(this, { height, topLeft, width } as IDimensions);
    }
}
