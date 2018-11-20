import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, map } from 'rxjs/operators';
import { HistoryService } from '../core/history.service';
import { Action } from '../shared/models/history-log';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService,
              private historyService: HistoryService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isCurrentUserAdmin().pipe(
      take(1),
      map( bool => {
        if (!bool) {
          console.log('ONLY ADMINS CAN ACCESS HISTORY COMPONENT');
          this.historyService.log(Action.Error, 'Non-Admin attemped to access History Component');
        }
        return bool;
      })
    );
  }
}
