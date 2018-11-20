import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HistoryService } from 'src/app/core/history.service';
import { Action } from 'src/app/shared/models/history-log';
// gtag declartion used in emailLogin()
declare var gtag: Function;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(
    private authService: AuthService,
    private historyService: HistoryService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLoginEmail(): void {
    if (this.validateForm(this.email, this.password)) {
      this.emailLogin(this.email, this.password);
    }
  }

  validateForm(email: string, password: string): boolean {
    if (email.length === 0) {
      return false;
    }

    if (password.length === 0) {
      return false;
    }

    if (password.length < 6) {
      return false;
    }
    return true;
  }

  emailLogin(email: string, password: string) {
    this.authService.loginWithEmail(this.email, this.password)
        .then(() => {
          console.log('Login Successful!');
          gtag('event', 'login');
          this.historyService.log(Action.LoggedIn);
          this.router.navigate(['dashboard']);
        })
        .catch( error => {
          console.log(error);
          this.historyService.log(Action.Error, error);
          this.router.navigate(['login']);
        });
  }
}
