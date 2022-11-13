import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertComponent } from './component/alert/alert.component';
import { HomeComponent } from './component/home/home.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { AdminGuard } from './guard/admin.guard';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'alert', component: AlertComponent },
  { path: 'home', component: HomeComponent, canDeactivate: [AuthGuard] },
  { path: "auth", loadChildren: () => import('./auth/auth.module').then(M => M.AuthModule) },
  { path: "main", loadChildren: () => import('./main/main.module').then(M => M.HomeModule) },
  { path: "admin", canActivate: [AuthGuard], canActivateChild: [AdminGuard], loadChildren: () => import('./dasboard/dashboard.module').then(M => M.DashboardModule) },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
