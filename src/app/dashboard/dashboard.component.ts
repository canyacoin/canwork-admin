import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userPermissions = [];

  constructor(private user: UserService) { }

  ngOnInit() {
    this.userPermissions = this.user.getPermissions();
  }

}
