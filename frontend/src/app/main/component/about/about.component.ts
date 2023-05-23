import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { PageService } from 'src/app/service/page.service';
import { Page } from 'src/app/model/page.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  pageService = inject(PageService);

  faBrifcace = faBriefcase;
  heroPage?: Page;

  constructor() {
    this.getHero();
  }

  getHero() {
    this.pageService.getPage('about')
      .pipe(map(page => this.heroPage = page))
      .subscribe();
  }
}
