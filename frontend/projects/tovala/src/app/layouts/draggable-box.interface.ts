import { Point } from '@angular/cdk/drag-drop/drag-ref';

export interface IDraggableBox {
    backgroundColor: string;
    topLeft: Point;
    height: number;
    width: number;
}
