import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { StyleManagerService } from 'src/app/service/style-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() taggledEvent: any = new EventEmitter();

  isDark = this.styleManager.isDark;
  isLogin: Observable<boolean> | undefined;
  isAdmin: Observable<boolean> | undefined;

  isUser: string | undefined;

  constructor(private auth: AuthService, private router: Router, private styleManager: StyleManagerService) { }

  ngOnInit(): void {
    this.isLogin = this.auth.isLoggedIn;
    this.isAdmin = this.auth.isAdmin;
  }

  login() {
    this.router.navigate(['/auth/login']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }

  taggledAction() {
    this.taggledEvent.emit('');
  }

  toggleDarkTheme() {
    this.styleManager.toggleDarkTheme();
    this.isDark = !this.isDark;
  }
}
