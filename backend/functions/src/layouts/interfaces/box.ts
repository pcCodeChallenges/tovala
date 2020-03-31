import { IPoint } from './point';

export interface IBox {
    id: string;
    backgroundColor: string;
    height: number;
    topLeft: IPoint;
    width: number;
}
