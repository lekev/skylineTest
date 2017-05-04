import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadBalancingComponent } from './load-balancing.component';
import {HttpCollectorLbService} from "app/networking/shared/services";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";

const routes: Routes = [
    { path: '', component: LoadBalancingComponent }
];

@NgModule({
    imports: [
      NgbDropdownModule.forRoot(),
      RouterModule.forChild(routes)
    ],
    providers:[HttpCollectorLbService],
    exports: [RouterModule]
})
export class LoadBalancingRoutingModule { }
