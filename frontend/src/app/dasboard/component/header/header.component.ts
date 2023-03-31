import { modal } from 'src/app/service/dialog.decorator';
import { ImageService } from 'src/app/service/image.service';
import { Component, EventEmitter, Host, inject, OnInit, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { StyleManagerService } from 'src/app/service/style-manager.service';
import { AdminService } from 'src/app/service/admin.service';
import { LoginComponent } from 'src/app/auth/component/login/login.component';
import { AlertComponent } from 'src/app/component/alert/alert.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() taggledEvent: any = new EventEmitter();

  styleManager = inject(StyleManagerService, { skipSelf: true });

  isDark: boolean = false;
  isLogin: Observable<boolean> | undefined;

  file: string | undefined;
  isUser: string | undefined;

  constructor(
    private image: ImageService,
    private admin: AdminService,
    private auth: AuthService,
    private router: Router,
    private _renderer: Renderer2,
  ) {
    this.isDark = this.styleManager.isDark;
  }

  ngOnInit(): void {
    this.isLogin = this.auth.isLoggedIn;
    this.admin.getUser(this.auth.getUser())
      .subscribe(user => this.image.img_download(user.avatar.id).subscribe(img => this.file = img));
  }

  @modal(LoginComponent)
  login() {
    this.router.navigate(['admin']);
  }

  @modal(AlertComponent, AlertComponent.defaultAlertData)
  logout() {
    this.auth.logout();
    this.router.navigate(['home']);
  }

  taggledAction() {
    this.taggledEvent.emit('');
  }

  toggleDarkTheme() {
    this.isDark = !this.isDark;

    if (this.isDark) {
      this._renderer.removeClass(document.body, 'light-theme');
      this._renderer.addClass(document.body, 'dark-theme');
    } else {
      this._renderer.removeClass(document.body, 'dark-theme');
      this._renderer.addClass(document.body, 'light-theme');
    }

    // this.styleManager.toggleDarkTheme();
    // this.isDark = this.styleManager.isDark;
  }
}
