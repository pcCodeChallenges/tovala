import { Point } from '@angular/cdk/drag-drop/drag-ref';

export interface IBox {
    id?: string;
    backgroundColor: string;
    height: number;
    topLeft: Point;
    width: number;
}
