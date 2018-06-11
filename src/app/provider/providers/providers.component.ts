import { Component, OnInit } from '@angular/core';
import { PioneerService } from 'src/app/provider/services/pioneer.service';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators/filter';
import { pipe } from 'rxjs/util/pipe';
import { take } from 'rxjs/operators/take';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { switchMap } from 'rxjs/operators/switchMap';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {
  providers: any;
  providersSize: number;
  userDaoAccessLevel = -1;

  constructor(private pioneer: PioneerService, private user: UserService) {
    this.userDaoAccessLevel = user.getUser().daoAccessLevel;
  }

  ngOnInit() {
    this.pioneer.getPioneers()
      .valueChanges()
      .subscribe(_pioneers => {
        const filteredPioneers = _pioneers.filter(this.filterByDaoAccessLevel.bind(this));
        this.providersSize = filteredPioneers.length;
        this.providers = Observable.of(filteredPioneers);
      });
  }

  filterByDaoAccessLevel(p) {
    return !p.rating.task || this.userDaoAccessLevel >= p.rating.task.requiredAccessLevel;
  }
}
