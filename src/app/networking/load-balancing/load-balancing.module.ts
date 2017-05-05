import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartsModule as Ng2Charts} from 'ng2-charts';

import {LoadBalancingRoutingModule} from './load-balancing-routing.module';
import {LoadBalancingComponent} from './load-balancing.component';
import {PageHeaderModule} from '../../shared';
import {NgbButtonsModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NvD3Module} from "angular2-nvd3";
import { ServersChartComponent } from './servers-chart/servers-chart.component';
import {MomentModule} from "angular2-moment";
import {MdCheckboxModule} from "@angular/material";


@NgModule({
  imports: [
    CommonModule,
    Ng2Charts,
    LoadBalancingRoutingModule,
    NgbButtonsModule.forRoot(),
    MdCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    PageHeaderModule,
    NvD3Module
  ],
  declarations: [LoadBalancingComponent, ServersChartComponent]
})
export class LoadBalancingModule {
}
