import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './routing/app.routing.module';

// ngrx functions
import { UserEffects } from './app.effects';
import { appReducer, initialState } from './app.store';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserService } from 'src/app/services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot(<any>{ app: appReducer }, { initialState }),
    EffectsModule.forRoot([UserEffects]),
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
