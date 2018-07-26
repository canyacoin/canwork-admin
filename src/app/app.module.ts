import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './routing/app.routing.module';
import { ProviderModule } from './provider/provider.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CanpayModule } from '@canyaio/canpay-lib';

// ngrx functions
import { reducers } from './_state/reducers';
import { CommonEffects } from './_state/effects/common.effects';
import { DaoEffects } from './_state/effects/dao.effects';
import { UserEffects } from 'src/app/_state/effects/user.effects';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserService } from 'src/app/services/user.service';
import { DaoService } from 'src/app/services/dao.service';
import { AlertService } from 'src/app/services/alert.service';
import { environment } from 'src/environments/environment';
import { CanWorkAdminEthService } from 'src/app/services/eth/canwork-admin-eth.service';
import { DashboardOwnerComponent } from './dashboard-owner/dashboard-owner.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { ManageAdminsComponent } from './manage-admins/manage-admins.component';
import { ManageOwnersComponent } from './manage-owners/manage-owners.component';
import { ManageTransferComponent } from './manage-transfer/transfer.component';
import { CanWorkEthService } from 'src/app/services/eth/canwork-eth.service';


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
    ManageTransferComponent
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
