import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NetworkingComponent } from './networking.component';

const routes: Routes = [
    {
        path: '', component: NetworkingComponent,
        children: [
            { path: 'load-balancing', loadChildren: './load-balancing/load-balancing.module#LoadBalancingModule' }
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NetworkingRoutingModule { }
