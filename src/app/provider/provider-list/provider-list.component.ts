import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})
export class ProviderListComponent implements OnInit {
  @Input() providers = [];
  p = 1;

  sortTypes = [
    {
      key: 'latest',
      label: 'Latest'
    },
    {
      key: 'completedAtASC',
      label: 'Completed At (ASC)'
    },
    {
      key: 'completedAtDESC',
      label: 'Completed At (DESC)'
    },
    {
      key: 'amountASC',
      label: 'Amount (ASC)'
    },
    {
      key: 'amountDESC',
      label: 'Amount (DESC)'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
