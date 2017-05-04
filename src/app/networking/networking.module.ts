import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NetworkingRoutingModule } from './networking-routing.module';
import { NetworkingComponent } from './networking.component';
import { HeaderComponent, SidebarComponent } from '../shared';

@NgModule({
    imports: [
        CommonModule,
        NetworkingRoutingModule
    ],
    declarations: [
        NetworkingComponent,
        HeaderComponent,
        SidebarComponent,
    ]
})
export class NetworkingModule { }
