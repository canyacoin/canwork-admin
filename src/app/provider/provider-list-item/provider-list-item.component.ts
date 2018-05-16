import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-provider-list-item',
  templateUrl: './provider-list-item.component.html',
  styleUrls: ['./provider-list-item.component.css']
})
export class ProviderListItemComponent implements OnInit {
  @Input() provider: any;

  constructor() { }

  ngOnInit() { }

}
