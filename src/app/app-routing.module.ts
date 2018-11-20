import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { NbAuthComponent } from '@nebular/auth';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  { path: 'dashboard', canActivate: [AuthGuard], loadChildren: './dashboard/dashboard.module#DashboardModule'},
  {
    path: 'login',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      }
    ]
  }, {
    path: 'register',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: RegisterComponent,
      }
    ]
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
