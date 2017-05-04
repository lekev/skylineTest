import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartsModule as Ng2Charts} from 'ng2-charts';

import {LoadBalancingRoutingModule} from './load-balancing-routing.module';
import {LoadBalancingComponent} from './load-balancing.component';
import {PageHeaderModule} from '../../shared';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import {NgbButtonsModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    Ng2Charts,
    LoadBalancingRoutingModule,
    NgbButtonsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    PageHeaderModule,
    Ng2GoogleChartsModule
  ],
  declarations: [LoadBalancingComponent]
})
export class LoadBalancingModule {
}
