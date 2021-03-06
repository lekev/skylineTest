import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadBalancingRoutingModule} from './load-balancing-routing.module';
import {LoadBalancingComponent} from './load-balancing.component';
import {PageHeaderModule} from '../../shared';
import {NgbButtonsModule, NgbProgressbarModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NvD3Module} from "angular2-nvd3";
import { ServersChartComponent } from './servers-chart/servers-chart.component';
import {MomentModule} from "angular2-moment";
import {MdCheckboxModule} from "@angular/material";
import { SaCheckBoxComponent} from './shared/components/checkbox/checkbox.component';
import { TrafficFlowComponent } from './traffic-flow/traffic-flow.component';


@NgModule({
  imports: [
    CommonModule,
    LoadBalancingRoutingModule,
    NgbButtonsModule.forRoot(),
    NgbProgressbarModule.forRoot(),
    NgbTooltipModule.forRoot(),
    MdCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    PageHeaderModule,
    NvD3Module
  ],
  declarations: [LoadBalancingComponent, ServersChartComponent, SaCheckBoxComponent, TrafficFlowComponent]
})
export class LoadBalancingModule {
}
