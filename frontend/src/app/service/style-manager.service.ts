import { inject, Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleManagerService {

  private _renderer = inject(Renderer2, { optional: true });
  isDark = false;

  toggleDarkTheme() {
    this.isDark = !this.isDark;

    if (this.isDark) {
      this._renderer?.removeClass(document.body, 'light-theme');
      this._renderer?.addClass(document.body, 'dark-theme');
    } else {
      this._renderer?.removeClass(document.body, 'dark-theme');
      this._renderer?.addClass(document.body, 'light-theme');
    }
  }
}
