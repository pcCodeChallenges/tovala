import { IBox } from '../../interfaces/box';
import { ILayout } from '../../interfaces/layout';

export class Layout implements ILayout {
    boxes: Array<IBox>;
    id: string;
    name: string;
    userId: string;

    constructor(layout: ILayout) {
        Object.assign(this, layout);
    }
}
