import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, ActionTypes } from '../../app.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isUserAuthenticated = false;

  constructor(private store: Store<State>, private router: Router) { }

  ngOnInit() {
    this.store.select('app').subscribe(appState => {
      console.log('appState: ', appState);
      this.isUserAuthenticated = appState.user.isAuthenticated;
    });
  }

  logout() {
    this.store.dispatch({
      type: ActionTypes.USER_SIGNEDOUT,
      isVerified: false
    });

    this.router.navigate(['/signin']);
  }
}
