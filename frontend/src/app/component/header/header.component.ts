import { AlertComponent } from './../alert/alert.component';
import { DialogService } from './../../service/dialog.service';
import { LoginComponent } from './../../auth/component/login/login.component';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { StyleManagerService } from 'src/app/service/style-manager.service';
import { modal } from 'src/app/service/dialog.decorator';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() taggledEvent: any = new EventEmitter();

  dialogService = inject(DialogService);

  isDark = this.styleManager.isDark;
  isLogin: Observable<boolean> | undefined;
  isAdmin: Observable<boolean> | undefined;

  constructor(
    private auth: AuthService,
    private router: Router,
    private styleManager: StyleManagerService,
  ) { }

  ngOnInit(): void {
    this.isLogin = this.auth.isLoggedIn;
    this.isAdmin = this.auth.isAdmin;
  }

  @modal(LoginComponent)
  login() {
    this.router.navigate(['/admin']);
  }

  @modal(AlertComponent, AlertComponent.defaultAlertData)
  logout() {
    this.auth.logout();
  }

  toggleDarkTheme() {
    this.styleManager.toggleDarkTheme();
    this.isDark = !this.isDark;
  }

  taggledAction() {
    this.taggledEvent.emit('');
  }
}
