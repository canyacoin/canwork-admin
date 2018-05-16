import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/provider/services/provider.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {
  providers = [];

  constructor(private provider: ProviderService) { }

  async ngOnInit() {
    this.providers = await this.provider.getProviders();
  }

}
