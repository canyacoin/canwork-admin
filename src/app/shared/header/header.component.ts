import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { UserSignOutAction } from 'src/app/_state/actions/user.action';
import { getDaoUser } from 'src/app/_state/reducers';
import { getUser } from 'src/app/_state/reducers';
import { UserRole } from 'src/app/_state/reducers/user.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isUserAuthenticated = false;
  userType: string;
  isDaoUser = false;

  constructor(private store: Store<any>, private router: Router) { }

  ngOnInit() {
    this.store.select(getUser).subscribe(user => {
      console.log('user: ', user);
      this.userType = user.daoAccessLevel;
      this.isUserAuthenticated = user.isAuthenticated;
      this.isDaoUser = user.role === UserRole.DaoUser;
    });
  }

  logout() {
    this.store.dispatch(new UserSignOutAction({ isAuthenticated: false }));
  }
}
