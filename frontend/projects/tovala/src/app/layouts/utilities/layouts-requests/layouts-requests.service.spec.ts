import {
    HttpClientTestingModule, HttpTestingController, TestRequest
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { Subscription } from 'rxjs';
import { ApiPaths } from '../api-paths';
import { Layout } from '../layout/layout';
import { IBEBox } from '../server-interfaces/be-box';
import { IBELayout } from '../server-interfaces/be-layout';

import { LayoutsRequestsService } from './layouts-requests.service';

describe('LayoutsRequestsService', () => {
    let layoutsRequestsService: LayoutsRequestsService;
    let httpTestingController: HttpTestingController;

    // Locals
    let requestSubscription: Subscription;

    // Test Data
    let testLayouts: Array<IBELayout>;

    beforeEach(() => {
        testLayouts = [
            {
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
            } as IBELayout,
            {
                id: 'VlVXMhyi2nZVkNMjWymF',
                name: 'Layout 2',
                userId: '2',
                boxes: [
                    {
                        id: '2345678901',
                        backgroundColor: '#BBCCDDEE',
                        height: 75,
                        topLeft: {
                            x: 5,
                            y: 5
                        },
                        width: 75
                    } as IBEBox
                ]
            } as IBELayout
        ];
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ]
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        layoutsRequestsService = TestBed.inject(LayoutsRequestsService);
    });

    it('should be created', () => {
        expect(layoutsRequestsService instanceof LayoutsRequestsService)
            .toBeTruthy();
    });

    describe('deleteLayout', () => {
        afterEach(() => {
            httpTestingController.verify();

            if (requestSubscription) {
                requestSubscription.unsubscribe();
            }
        });

        it('should return an observable for the deleted layout', async(() => {
            const testLayout: IBELayout = testLayouts[0];

            // Make an HTTP DELETE request
            requestSubscription = layoutsRequestsService.deleteLayout('1234567890')
                .subscribe((layout: Layout) => {
                    // When observable resolves, result should match test data
                    expect(layout.id).toEqual(testLayout.id);
                });

            // The following `expectOne()` will match the request's URL.
            // If no requests or multiple requests matched that URL
            // `expectOne()` would throw.
            const req: TestRequest = httpTestingController.expectOne(
                ApiPaths.deleteLayout);

            // Respond with mock data, causing Observable to resolve.
            // Subscribe callback asserts that correct data was returned.
            req.flush(testLayout);
        }));
    });

    describe('deleteLayout', () => {
        afterEach(() => {
            httpTestingController.verify();

            if (requestSubscription) {
                requestSubscription.unsubscribe();
            }
        });

        it('should return an observable for all layouts', async(() => {
            // Make an HTTP GET request
            requestSubscription = layoutsRequestsService.getLayouts()
                .subscribe((layouts: Array<Layout>) => {
                    const layoutIds: Array<string> =
                        layouts.map((layout: Layout) => layout.id);
                    const testLayoutIds: Array<string> =
                        testLayouts.map((beLayout: IBELayout) => beLayout.id);

                    // When observable resolves, result should match test data
                    expect(layoutIds.join(',')).toEqual(testLayoutIds.join(','));
                });

            // The following `expectOne()` will match the request's URL.
            // If no requests or multiple requests matched that URL
            // `expectOne()` would throw.
            const req: TestRequest = httpTestingController.expectOne(ApiPaths.getLayouts);

            // Respond with mock data, causing Observable to resolve.
            // Subscribe callback asserts that correct data was returned.
            req.flush(testLayouts);
        }));
    });

    describe('saveLayout', () => {
        afterEach(() => {
            httpTestingController.verify();

            if (requestSubscription) {
                requestSubscription.unsubscribe();
            }
        });

        it('should return an observable for the saved layout', async(() => {
            const testLayout: IBELayout = testLayouts[0];

            // Make an HTTP POST request
            requestSubscription = layoutsRequestsService.saveLayout(testLayout)
                .subscribe((layout: Layout) => {
                    // When observable resolves, result should match test data
                    expect(layout.id).toEqual(testLayout.id);
                });

            // The following `expectOne()` will match the request's URL.
            // If no requests or multiple requests matched that URL
            // `expectOne()` would throw.
            const req: TestRequest = httpTestingController.expectOne(ApiPaths.saveLayout);

            // Respond with mock data, causing Observable to resolve.
            // Subscribe callback asserts that correct data was returned.
            req.flush(testLayout);
        }));
    });
});
