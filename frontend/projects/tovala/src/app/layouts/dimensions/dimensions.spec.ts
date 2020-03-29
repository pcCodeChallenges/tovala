import { Point } from '@angular/cdk/drag-drop/drag-ref';
import { Dimensions } from './dimensions';

describe('Dimensions', () => {
    it('should create an instance', () => {
        expect(new Dimensions(75, { x: 5, y: 5 } as Point, 75)).toBeTruthy();
    });
});
