import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AlertDialogData } from 'src/app/model/alert-dialog.model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  static defaultAlertData = {
    title: 'A you sure?',
    subtitle: 'You can login again when you want.',
    message: 'If you want to logout current user,',
  };

  isAdmin: Observable<boolean> | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AlertDialogData,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.auth.isAdmin;
    this.data = AlertComponent.defaultAlertData;
  }
}
