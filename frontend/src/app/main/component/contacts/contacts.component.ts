import { Component, inject } from '@angular/core';
import { faGithub, faLinkedinIn, faTelegram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faGlobe, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs';
import { PageService } from 'src/app/service/page.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {

  pageService = inject(PageService);

  contactPage: any;

  locationDot = faLocationDot;
  envelope = faEnvelope;
  globe = faGlobe;
  github = faGithub;
  linkedinIn = faLinkedinIn;
  telegram = faTelegram;
  facebook = faFacebook;

  constructor() {
    this.pageService.getPage('contacts')
      .pipe(map(page => this.contactPage = page))
      .subscribe();
  }

}
