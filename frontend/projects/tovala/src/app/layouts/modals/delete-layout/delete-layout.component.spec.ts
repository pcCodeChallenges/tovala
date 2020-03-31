import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLayoutComponent } from './delete-layout.component';

describe('DeleteLayoutComponent', () => {
    let component: DeleteLayoutComponent;
    let fixture: ComponentFixture<DeleteLayoutComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                                           declarations: [DeleteLayoutComponent]
                                       })
               .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DeleteLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
