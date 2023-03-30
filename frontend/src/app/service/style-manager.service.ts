import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleManagerService {

  isDark = false;

  toggleDarkTheme() {
    if (this.isDark) {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      this.isDark = false;
    } else {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      this.isDark = true;
    }
  }
}
