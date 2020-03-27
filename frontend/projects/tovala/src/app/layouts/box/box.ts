import { Point } from '@angular/cdk/drag-drop/drag-ref';
import { IDimensions } from '../dimensions/dimensions.interface';

export class Box implements IDimensions {
    height: number;
    topLeft: Point;
    width: number;

   constructor(dimensions? :IDimensions) {
        Object.assign(this, dimensions);
    }
}
