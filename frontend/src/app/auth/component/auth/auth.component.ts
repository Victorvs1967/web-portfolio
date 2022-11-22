import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isAdmin: Observable<boolean> | undefined;

  dialogConfig: MatDialogConfig = {
    width: '50rem',
    data: {},
  };

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.dialog.open(LoginComponent, this.dialogConfig)
      .afterClosed().subscribe(data => {
        this.auth.login(data).subscribe(() => this.router.navigate(['/admin']));
      });
  }

}
