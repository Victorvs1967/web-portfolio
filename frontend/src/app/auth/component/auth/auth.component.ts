import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

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
        this.auth.login(data).subscribe(() => this.router.navigate(['admin']));
      });
  }
}
