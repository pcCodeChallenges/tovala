import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveLayoutComponent } from './save-layout.component';

describe('SaveLayoutComponent', () => {
    let component: SaveLayoutComponent;
    let fixture: ComponentFixture<SaveLayoutComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                                           declarations: [SaveLayoutComponent]
                                       })
               .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SaveLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
