import { Point } from '@angular/cdk/drag-drop/drag-ref';
import { Box } from './box';

describe('Box', () => {
    it('should create an instance', () => {
        expect(new Box({ x: 5, y: 5 } as Point)).toBeTruthy();
    });
});
