import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BarRatingModule } from 'ngx-bar-rating';
import { NgxPaginationModule } from 'ngx-pagination';

import { ListToolbarComponent } from 'src/app/shared/list-toolbar/list-toolbar.component';
import { ListComponent } from 'src/app/shared/list/list.component';
import { MsgBoxComponent } from 'src/app/shared/msg-box/msg-box.component';
import { TabButtonsComponent } from 'src/app/shared/tab-buttons/tab-buttons.component';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    BarRatingModule
  ],
  declarations: [HeaderComponent, FooterComponent, ListComponent, ListToolbarComponent, MsgBoxComponent, TabButtonsComponent],
  exports: [
    HeaderComponent,
    FooterComponent,
    ListToolbarComponent,
    MsgBoxComponent,
    TabButtonsComponent,
    NgxPaginationModule,
    BarRatingModule
  ]
})
export class SharedModule { }
