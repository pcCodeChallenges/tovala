import { IBox } from './box';

export interface ILayout {
    id?: string;
    name: string;
    userId?: string;
    boxes: Array<IBox>;
}
