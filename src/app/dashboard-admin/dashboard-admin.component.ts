import { Component, OnInit } from '@angular/core';

import { IUser } from 'src/app/_state/reducers/user.reducer';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  isWhiteListedAdmin: boolean;

  constructor(private userService: UserService) {
    this.isWhiteListedAdmin = userService.isWhiteListedAdmin();
  }

  ngOnInit() { }

  exec() {
    alert('To be implemented...');
  }

}
