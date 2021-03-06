import { Component, OnInit } from '@angular/core';
import { PioneerService } from 'src/app/provider/services/pioneer.service';
import { Observable, of } from 'rxjs';
import { filter, take, mergeMap, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {
  providers: any;
  providersSize: number;
  user: any;
  userDaoAccessLevel = -1;

  constructor(private pioneer: PioneerService, private userService: UserService) {
    this.user = userService.getUser();
  }

  ngOnInit() {
    this.pioneer.getPioneers()
      .valueChanges()
      .subscribe(_pioneers => {
        const filteredPioneers = _pioneers.filter(this.filterByDaoAccessLevel.bind(this));
        this.providersSize = filteredPioneers.length;
        this.providers = of(filteredPioneers);
      });
  }

  filterByDaoAccessLevel(pioneerRecord) {
    return (!pioneerRecord.rating.task || this.isDaoUserHasEnoughPriviledges(pioneerRecord))
      && !this.isRecordExecutedBySameUser(pioneerRecord);
  }

  isDaoUserHasEnoughPriviledges(pioneerRecord) {
    return pioneerRecord.rating.task.requiredAccessLevel[this.user.daoAccessLevel];
  }

  isRecordExecutedBySameUser(pioneerRecord) {
    return pioneerRecord.rating.reviews.find(r => r.createdBy === this.user.id);
  }

}
