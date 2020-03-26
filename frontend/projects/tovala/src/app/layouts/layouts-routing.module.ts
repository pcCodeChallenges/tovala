import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutsComponent } from './layouts/layouts.component';

const routes: Routes = [
    {
        path: 'layouts',
        component: LayoutsComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class LayoutsRoutingModule {
}
