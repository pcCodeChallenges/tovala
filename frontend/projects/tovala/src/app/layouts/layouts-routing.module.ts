import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from '../route-guards/is-authenticated/is-authenticated.guard';

import { LayoutsComponent } from './layouts/layouts.component';

const routes: Routes = [
    {
        path: 'layouts',
        component: LayoutsComponent,
        canActivate: [IsAuthenticatedGuard]
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
