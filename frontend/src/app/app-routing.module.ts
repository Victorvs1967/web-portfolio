import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: "admin", canActivate: [AuthGuard], loadChildren: () => import('./dasboard/dashboard.module').then(m => m.DashboardModule) },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
