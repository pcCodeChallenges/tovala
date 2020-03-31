import { ILayout } from '../../interfaces/layout';
import { Layout } from './layout';

describe('Layout', () => {
    it('should create an instance', () => {
        expect(new Layout({} as ILayout)).toBeTruthy();
    });
});
