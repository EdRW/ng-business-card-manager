import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { HistoryService } from '../core/history.service';
import { Action } from '../shared/models/history-log';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private historyService: HistoryService,
    private router: Router) { }

  ngOnInit() {
  }

  logout() {
    console.log('LOGGING OUT USER. ROUTING TO LOGIN SCREEN!');
    this.historyService.log(Action.LoggedOut);
    this.authService.signOut();
    this.router.navigate(['login']);
  }

}
