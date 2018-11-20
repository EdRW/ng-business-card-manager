import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HistoryService } from 'src/app/core/history.service';
import { Router } from '@angular/router';
import { Action } from 'src/app/shared/models/history-log';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private historyService: HistoryService,
    private router: Router) { }

  ngOnInit() {
  }

  onRegister(): void {
    if (this.validateForm(this.email, this.password)) {
      this.register(this.email, this.password);
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

  register(email: string, password: string) {
    this.authService.registerWithEmail(this.email, this.password)
        .then(() => {
          console.log('Registration Successful!');
          this.historyService.log(Action.Register);
          this.router.navigate(['dashboard']);
        })
        .catch( error => {
          console.log(error);
          this.historyService.log(Action.Error, error);
          this.router.navigate(['register']);
        });
  }
}
