import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-msg-box',
  templateUrl: './msg-box.component.html',
  styleUrls: ['./msg-box.component.css']
})
export class MsgBoxComponent implements OnInit {
  @Output() action = new EventEmitter();
  @Input() type: string;
  @Input() text: string;
  @Input() controls: any;

  constructor() { }

  ngOnInit() {
    console.log('type: ', this.type);
  }

  cancel() {
    console.log('cancel...');
    this.action.emit('cancel');
  }

  ok() {
    console.log('ok...');
    this.action.emit('ok');
  }

}
