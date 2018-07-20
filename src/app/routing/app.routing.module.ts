import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { LoginComponent } from 'src/app/login/login.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { AuthGuard } from 'src/app/routing/auth.guard';
import { DashboardOwnerComponent } from 'src/app/dashboard-owner/dashboard-owner.component';
import { DashboardAdminComponent } from 'src/app/dashboard-admin/dashboard-admin.component';
import { ManageOwnersComponent } from 'src/app/manage-owners/manage-owners.component';
import { ManageAdminsComponent } from 'src/app/manage-admins/manage-admins.component';
import { ManageTransferComponent } from 'src/app/manage-transfer/transfer.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'index.html',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signin',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'dashboard-owner',
    component: DashboardOwnerComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'dashboard-admin',
    component: DashboardAdminComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'manage-owners',
    component: ManageOwnersComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'manage-admins',
    component: ManageAdminsComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'transfer',
    component: ManageTransferComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
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
export class AppRoutingModule { }
