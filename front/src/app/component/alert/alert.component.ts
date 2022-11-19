import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  isAdmin: Observable<boolean> | undefined;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.isAdmin = this.auth.isAdmin;
  }

  logout() {
    this.auth.logout(true);
  }
}
