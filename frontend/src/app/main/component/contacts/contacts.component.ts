import { Component, inject } from '@angular/core';
import { faGithub, faLinkedinIn, faTelegram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faGlobe, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs';
import { MainDataService } from 'src/app/service/main-data.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {

  data = inject(MainDataService);

  heroPage: any;

  locationDot = faLocationDot;
  envelope = faEnvelope;
  globe = faGlobe;
  github = faGithub;
  linkedinIn = faLinkedinIn;
  telegram = faTelegram;
  facebook = faFacebook;

  constructor() {
    this.data.loadData()
      .pipe(
        map(data => this.heroPage = data[2].contacts)
      )
      .subscribe();
  }

}
