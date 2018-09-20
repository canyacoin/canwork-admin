import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { CanpayModule } from '@canyaio/canpay-lib';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UserEffects } from 'src/app/_state/effects/user.effects';
import { AlertService } from 'src/app/services/alert.service';
import { DaoService } from 'src/app/services/dao.service';
import { CanWorkAdminEthService } from 'src/app/services/eth/canwork-admin-eth.service';
import { CanWorkEthService } from 'src/app/services/eth/canwork-eth.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

import { CommonEffects } from './_state/effects/common.effects';
import { DaoEffects } from './_state/effects/dao.effects';
// ngrx functions
import { reducers } from './_state/reducers';
import { AppComponent } from './app.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardOwnerComponent } from './dashboard-owner/dashboard-owner.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ManageAdminsComponent } from './manage-admins/manage-admins.component';
import { ManageOwnersComponent } from './manage-owners/manage-owners.component';
import { ManageProvidersComponent } from './manage-providers/manage-providers.component';
import { ManageTransferComponent } from './manage-transfer/transfer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProviderModule } from './provider/provider.module';
import { AppRoutingModule } from './routing/app.routing.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      CommonEffects,
      DaoEffects,
      UserEffects
    ]),
    SharedModule,
    ProviderModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    CanpayModule.forRoot({
      contracts: {
        useTestNet: environment.contracts.useTestNet,
        canyaCoinAddress: environment.contracts[environment.contracts.network].canyaCoin
      }
    })
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    PageNotFoundComponent,
    DashboardOwnerComponent,
    DashboardAdminComponent,
    ManageAdminsComponent,
    ManageOwnersComponent,
    ManageTransferComponent,
    ManageProvidersComponent
  ],
  providers: [
    UserService,
    DaoService,
    AlertService,
    CanWorkAdminEthService,
    CanWorkEthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
