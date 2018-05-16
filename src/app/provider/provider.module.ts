import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderRoutingModule } from './routing/provider.routing.module';
import { VoteProviderComponent } from './vote-provider/vote-provider.component';
import { ClassifyProviderComponent } from './classify-provider/classify-provider.component';
import { ProviderListItemComponent } from './provider-list-item/provider-list-item.component';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { ProvidersComponent } from './providers/providers.component';
import { ProviderViewComponent } from './provider-view/provider-view.component';
import { ProviderService } from 'src/app/provider/services/provider.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { TypeformService } from 'src/app/provider/services/typeform.service';

@NgModule({
  imports: [
    CommonModule,
    ProviderRoutingModule,
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
  providers: [ProviderService, TypeformService]
})
export class ProviderModule { }
