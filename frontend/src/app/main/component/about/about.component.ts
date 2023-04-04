import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { MainDataService } from 'src/app/service/main-data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  data = inject(MainDataService);

  heroPage: any;

  faBrifcace = faBriefcase;

  constructor() {
    this.data.loadData()
      .pipe(
        map(data => this.heroPage = data[1].about)
      )
      .subscribe();
  }

}
