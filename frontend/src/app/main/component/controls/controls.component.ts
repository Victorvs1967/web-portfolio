import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

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
        const page = document.getElementById(control.dataset.id),
              active = document.querySelector('.active');
        active?.classList.remove('active');
        page?.classList.add('active');
      });
    });

    // toggle theme
    document.querySelector('.theme-btn')?.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
    });
  };
}
