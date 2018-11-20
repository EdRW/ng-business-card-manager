import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { HistoryLog, Action } from '../shared/models/history-log';
import { Observable } from 'rxjs';

@Injectable()
export class HistoryService {
  historyLogRef: AngularFireList<HistoryLog>;

  constructor(
    private authservice: AuthService,
    private db: AngularFireDatabase
  ) {
    this.historyLogRef = this.db.list<HistoryLog>('history');
  }

  getHistory(): Observable<HistoryLog[]> {
    return this.historyLogRef.valueChanges();
  }

  addHistoryLog(log: HistoryLog) {
    this.historyLogRef.push(log);
  }

  log(_action: Action, _data = '') {
    console.log(`ADDING ${_action} TO HISTORY LOG`);
    const log = <HistoryLog>{ timeStamp: (new Date()).toLocaleString(),
                              userUid: this.authservice.userUid,
                              action: _action,
                              data: _data,
                            };
    this.addHistoryLog(log);
  }
}
