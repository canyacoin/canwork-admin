import { Component, OnInit, Input } from '@angular/core';
import { ProviderService } from 'src/app/provider/services/provider.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vote-provider',
  templateUrl: './vote-provider.component.html',
  styleUrls: ['./vote-provider.component.css']
})
export class VoteProviderComponent implements OnInit {
  @Input() provider: any = {};

  constructor(private route: ActivatedRoute, private providerService: ProviderService) {
  }

  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.provider = this.providerService.getProvider(params.id) || {};
    });
  }

}
