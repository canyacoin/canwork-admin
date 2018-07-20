import { Injectable } from '@angular/core';
import { Observable } from '@firebase/util/dist/src/subscribe';
import { Subject } from 'rxjs';

const sorted = alerts => alerts.sort((a: any, b: any) => b.id > a.id ? 1 : -1);

@Injectable()
export class AlertService {
  subject: Subject<any>;
  alerts = [];
  alertId = 0;

  constructor() {
    this.subject = new Subject();
  }

  get() {
    return this.subject;
  }

  success(msg, title, durationInMilliSecs = 7000) {
    this.alert('success', msg, title, durationInMilliSecs);
  }

  error(msg, title, durationInMilliSecs = 7000) {
    this.alert('error', msg, title, durationInMilliSecs);
  }

  alert(type, msg, title, durationInMilliSecs) {
    this.subject.next({ id: ++this.alertId, type, text: msg, title });
    this.dismissAfter(durationInMilliSecs, this.alertId);
  }

  dismissAfter(duration, alertId) {
    setTimeout(() => {
      this.subject.next({ id: alertId, type: null });
    }, duration);
  }

}
