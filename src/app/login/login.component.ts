import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State, ActionTypes, User } from '../app.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private store: Store<State>) { }

  ngOnInit() { }

  login() {
    this.store.dispatch({
      type: ActionTypes.USER_AUTHENTICATED,
      payload: {
        isAuthenticated: true,
        permissions: ['VOTE_PROVIDERS', 'CLASSIFY_PROVIDERS']
      }
    });

    this.router.navigate(['/dashboard']);
  }
}
