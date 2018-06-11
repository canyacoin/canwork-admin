import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProviderRoutingModule } from './routing/provider.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';

import { VoteProviderComponent } from './vote-provider/vote-provider.component';
import { ClassifyProviderComponent } from './classify-provider/classify-provider.component';
import { ProviderListItemComponent } from './provider-list-item/provider-list-item.component';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { ProvidersComponent } from './providers/providers.component';
import { ProviderViewComponent } from './provider-view/provider-view.component';
import { PioneerService } from 'src/app/provider/services/pioneer.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    CommonModule,
    FormsModule,
    ProviderRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [
    VoteProviderComponent,
    ClassifyProviderComponent,
    ProviderListItemComponent,
    ProviderListComponent,
    ProvidersComponent,
    ProviderViewComponent
  ],
  providers: [PioneerService]
})
export class ProviderModule { }
