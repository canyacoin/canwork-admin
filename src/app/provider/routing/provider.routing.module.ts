import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
// import { AuthGuard } from 'src/app/routing/auth.guard';
import { VoteProviderComponent } from 'src/app/provider/vote-provider/vote-provider.component';
import { ClassifyProviderComponent } from 'src/app/provider/classify-provider/classify-provider.component';
import { ProviderListComponent } from 'src/app/provider/provider-list/provider-list.component';
import { ProvidersComponent } from 'src/app/provider/providers/providers.component';

const routes: Routes = [
  {
    path: 'provider',
    children: [
      {
        path: '',
        component: ProvidersComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'vote/:id',
        component: VoteProviderComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'classify/:id',
        component: ClassifyProviderComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'list',
        component: ProvidersComponent,
        // canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: false })
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class ProviderRoutingModule { }
