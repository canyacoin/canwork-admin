import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './routing/app.routing.module';
import { ProviderModule } from './provider/provider.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    FormsModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    PageNotFoundComponent
  ],
  providers: [
    UserService,
    DaoService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
