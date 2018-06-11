import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DaoService } from 'src/app/services/dao.service';
import { DAOAuthenticateAction } from 'src/app/_state/actions/dao.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginType = 'mod';

  constructor(
    private route: ActivatedRoute,
    private store: Store<any>,
    private daoService: DaoService
  ) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.store.dispatch(new DAOAuthenticateAction({ daoAuthToken: params.daoAuthToken }));
      });
  }
}
