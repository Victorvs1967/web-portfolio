import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  isAdmin: Observable<boolean> | undefined;

  dialogConfig: MatDialogConfig = {
    width: '50rem',
    data: {},
  };
  
  constructor(
    private auth: AuthService,
    public dialogRef: MatDialogRef<AlertComponent>,
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.auth.isAdmin;
  }

  logout() {
    this.auth.logout(true);
  }
}
