import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Layout } from '../layout/layout';
import { LayoutsRequestsService } from '../layouts-requests/layouts-requests.service';
import { IBEBox } from '../server-interfaces/be-box';
import { IBELayout } from '../server-interfaces/be-layout';

import { LayoutsService } from './layouts.service';

describe('LayoutsService', () => {
    let layoutsService: LayoutsService;

    // Spies
    let layoutsRequestsServiceSpy: jasmine.SpyObj<LayoutsRequestsService>;

    beforeEach(() => {
        layoutsRequestsServiceSpy = jasmine.createSpyObj('LayoutsRequestsService', [
            'deleteLayout', 'getLayouts', 'saveLayout'
        ]);

        TestBed.configureTestingModule({
            providers: [
                { provide: LayoutsRequestsService, useValue: layoutsRequestsServiceSpy }
            ]
        });

        layoutsService = TestBed.inject(LayoutsService);
    });

    it('should be created', () => {
        expect(layoutsService instanceof LayoutsService).toBeTruthy();
    });

    describe('deleteLayout', () => {
        it('should call the deleteLayout requester', () => {
            layoutsRequestsServiceSpy.deleteLayout
                .and.returnValue(of({} as Layout));

            layoutsService.deleteLayout('1234567890');

            expect(layoutsRequestsServiceSpy.deleteLayout)
                .toHaveBeenCalled();
        });
    });

    describe('getLayouts', () => {
        it('should call the getLayouts requester', () => {
            layoutsRequestsServiceSpy.getLayouts
                .and.returnValue(of(new Array<Layout>({} as Layout)));

            layoutsService.getLayouts();

            expect(layoutsRequestsServiceSpy.getLayouts)
                .toHaveBeenCalled();
        });
    });

    describe('saveLayout', () => {
        it('should call the saveLayout requester', () => {
            const saveLayoutParams: IBELayout = {
                id: '9IoAtR3Vdur0vMQoeqEg',
                name: 'Layout 1',
                userId: '1',
                boxes: [
                    {
                        id: '1234567890',
                        backgroundColor: '#AABBCCDD',
                        height: 75,
                        topLeft: {
                            x: 5,
                            y: 5
                        },
                        width: 75
                    } as IBEBox
                ]
            } as IBELayout;

            layoutsRequestsServiceSpy.saveLayout
                .and.returnValue(of({} as Layout));

            layoutsService.saveLayout(saveLayoutParams);

            expect(layoutsRequestsServiceSpy.saveLayout)
                .toHaveBeenCalled();
        });
    });
});
