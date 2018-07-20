import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavigateAction } from 'src/app/_state/actions/common.action';

@Component({
  selector: 'app-dashboard-owner',
  templateUrl: './dashboard-owner.component.html',
  styleUrls: ['./dashboard-owner.component.css']
})
export class DashboardOwnerComponent implements OnInit {

  constructor(private store: Store<any>) { }

  ngOnInit() { }

  manageAdmins() {
    this.store.dispatch(new NavigateAction({ url: ['/manage-admins'] }));
  }

  manageOwners() {
    this.store.dispatch(new NavigateAction({ url: ['/manage-owners'] }));
  }

  transfer() {
    this.store.dispatch(new NavigateAction({ url: ['/transfer'] }));
  }

}
