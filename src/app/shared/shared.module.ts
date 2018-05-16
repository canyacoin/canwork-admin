import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ListToolbarComponent } from 'src/app/shared/list-toolbar/list-toolbar.component';
import { MsgBoxComponent } from 'src/app/shared/msg-box/msg-box.component';
import { TabButtonsComponent } from 'src/app/shared/tab-buttons/tab-buttons.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule
  ],
  declarations: [HeaderComponent, FooterComponent, ListToolbarComponent, MsgBoxComponent, TabButtonsComponent],
  exports: [HeaderComponent, FooterComponent, ListToolbarComponent, MsgBoxComponent, TabButtonsComponent, NgxPaginationModule]
})
export class SharedModule { }
