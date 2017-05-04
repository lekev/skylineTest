import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'networking',
        loadChildren: './networking/networking.module#NetworkingModule',
    },
    { path: '**', redirectTo: '/networking/load-balancing' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
