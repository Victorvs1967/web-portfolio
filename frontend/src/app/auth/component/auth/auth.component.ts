import { Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    // public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    // this.dialog.open(LoginComponent, {
    //   width: '50rem',
    // });
  }



}
