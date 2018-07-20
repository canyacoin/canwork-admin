import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { sha256 } from 'sha256';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';

const APP_API_KEY = `bearer ${environment.daoApiKey}`;
const baseUrl = environment.daoApiUrl;
const json = res => res.json();

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': APP_API_KEY
  })
};

@Injectable()
export class DaoService {

  constructor(private http: HttpClient) { }

  auth(daoAuthToken) {
    return this.http.get(`${baseUrl}/user/verify/${daoAuthToken}`, httpOptions)
      .pipe(map((user: any) => {
        user.isAuthenticated = true;
        return user;
      }));
  }

  execTask(taskKey, taskRecordRef, daoUserId, prevTaskRecordExecEvaluation) {
    return this.http.post(`${baseUrl}/task/${taskKey}/exec`, {
      taskRecordRef,
      daoUserId,
      prevTaskRecordExecEvaluation
    }, httpOptions);
  }
}
