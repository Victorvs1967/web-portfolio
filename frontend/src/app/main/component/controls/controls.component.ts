import { Component, OnInit } from '@angular/core';
import { StyleManagerService } from 'src/app/service/style-manager.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

  isDark = this.styleManager.isDark;

  constructor(private styleManager: StyleManagerService) {
  }

  ngOnInit(): void {
    // call main function
    this.pageTransition();
  }

  // animate pages and controls
  pageTransition = () => {
    // button click to active class
    const controls = document.querySelectorAll('.control');

    controls.forEach((control: any) => {
      control.addEventListener('click', () => {
        const buttons = document.querySelectorAll('.active-btn'),
          active = document.querySelector('.active'),
          id = document.getElementById(control.dataset.id);
        // remove active-btn class from all controlls
        buttons.forEach(ctrl => {
          ctrl.classList.remove('active-btn');
        });
        // add active class to selected
        control.classList.add('active-btn');
        active?.classList.remove('active');
        id?.classList.add('active');
      });
    });

    // toggle theme
    document.querySelector('.theme-btn')?.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
    });
  };

  toggleDarkTheme() {
    this.styleManager.toggleDarkTheme();
    this.isDark = !this.isDark;
  }

}
