import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SignupComponent } from 'src/app/auth/component/signup/signup.component';
import { AdminService } from 'src/app/service/admin.service';
import { AuthService } from 'src/app/service/auth.service';
import { AddProjectComponent } from './component/add-project/add-project.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isAdmin: Observable<boolean> | undefined;

  dialogConfig: MatDialogConfig = {
    width: '60%',
    data: {},
  };

  constructor(
    private auth: AuthService,
    private admin: AdminService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this._reloadCurrentRoute();
  }

  private async _reloadCurrentRoute(): Promise<void> {
    const url = this.router.url;
    const sameUrlStrategy = this.router.onSameUrlNavigation;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    await this.router.navigateByUrl(url);
    this.router.routeReuseStrategy.shouldReuseRoute = (future, curr) => future.routeConfig === curr.routeConfig;
    this.router.onSameUrlNavigation = sameUrlStrategy;
  }

  addUser() {
    this.dialog.open(SignupComponent, this.dialogConfig)
      .afterClosed().subscribe(data => {
        this.auth.signup(data).subscribe({
          next: () => {
            this._reloadCurrentRoute()
              .then(() => {
                this.router.onSameUrlNavigation = 'reload';
                this.router.navigate(['/admin/listUser']);
              });
          },
          error: err => alert(err.message)
        });
      });
  }

  addProject() {
    this.dialog.open(AddProjectComponent, this.dialogConfig)
      .afterClosed().subscribe(data => {
        this.admin.addProject(data).subscribe({
          next: () => {
            this._reloadCurrentRoute()
              .then(() => {
                this.router.onSameUrlNavigation = 'reload';
                this.router.navigate(['/admin/listProject']);
              });
          },
          error: err => alert(err.message)
        });
      });
  }

}
