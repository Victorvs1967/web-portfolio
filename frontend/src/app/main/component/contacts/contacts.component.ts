import { Component, OnInit } from '@angular/core';
import { faGithub, faLinkedinIn, faTelegram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faGlobe, faLocationDot } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  locationDot = faLocationDot;
  envelope = faEnvelope;
  globe = faGlobe;
  github = faGithub;
  linkedinIn = faLinkedinIn;
  telegram = faTelegram;
  facebook = faFacebook;

  constructor() { }

  ngOnInit(): void {
  }

}
