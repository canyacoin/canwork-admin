import { Component, OnInit, Input } from '@angular/core';
import { PioneerService } from 'src/app/provider/services/pioneer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DaoService } from 'src/app/services/dao.service';

const TASK_VOTE_PROVIDER = 'VOTE_PROVIDER';

@Component({
  selector: 'app-vote-provider',
  templateUrl: './vote-provider.component.html',
  styleUrls: ['./vote-provider.component.css']
})
export class VoteProviderComponent implements OnInit {
  @Input() pioneer: any;
  isLoading = false;

  review: any = {
    rating: {
      whyDoYouWantToBeListedOnCanya: 0,
      whatWillYouBringToCanya: 0,
      doYouHoldCrypto: 0,
      doYouHoldCanyaCoin: 0,
      whatIsYourIndustry: 0,
      email: 0,
      telegram: 0,
      portfolio: 0,
      resume: 0,
    },
    whyShouldThisUserBePartOfCanya: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pioneerService: PioneerService,
    private user: UserService,
    private daoService: DaoService
  ) {
  }

  ngOnInit() {
    const daoAccessLevel = this.user.getUser().daoAccessLevel;
    this.route.params.subscribe(async (params) => {
      this.pioneerService.getPioneers({ key: params.id })
        .valueChanges()
        .subscribe(_pioneers => {
          if (!_pioneers || !_pioneers.length) {
            this.router.navigate(['/provider/list']);
            return;
          }

          this.pioneer = _pioneers[0];

          if (this.pioneer.doYouHoldCrypto === 'Yes') {
            this.review.rating.doYouHoldCrypto = 1;
          }

          if (this.pioneer.doYouHoldCanyaCoin === 'Yes') {
            this.review.rating.doYouHoldCanyaCoin = 1;
          }

          if (this.pioneer.rating.reviews.length) {
            this.review = { ...this.pioneer.rating.reviews[0] };
          }
        });
    });
  }

  submit(nextAction) {
    // if (this.review.whyShouldThisUserBePartOfCanya.split(' ').length < 15) {
    //   alert('Please write a minimum of 15 words, why this user should be part of CanYa?');
    //   return;
    // }

    this.isLoading = true;
    const user = this.user.getUser();
    this.daoService.execTask(TASK_VOTE_PROVIDER, this.pioneer.key, user.id, this.review.prevTaskRecordExecEvaluation).subscribe(task => {
      this.review.createdBy = user.id;
      this.review.daoAccessLevel = user.daoAccessLevel || -1;
      this.pioneerService.updateRating({
        pioneer: this.pioneer,
        review: this.review,
        task
      });

      this.isLoading = false;

      if (nextAction === 'exit') {
        this.router.navigate(['/provider/list']);
        return;
      }
    });
  }

}
