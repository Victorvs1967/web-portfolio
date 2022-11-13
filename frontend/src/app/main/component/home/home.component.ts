import { Component } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { AdminService } from 'src/app/service/admin.service';
import { AuthService } from 'src/app/service/auth.service';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  user?: User;
  style = `object-fit: cover; transition: all 0.4s ease-in-out 0s; width: 100%; height: auto; border-radius: 0.5rem;`;
  hero = { username: 'hero', password: 'password' };

  constructor(private image: ImageService, private admin: AdminService, private auth: AuthService) {
    const style = { width: '100%', height: 'auto', radius: '.5rem', filter: 'grayscale(100%)' };
    this.auth.login(this.hero).subscribe(() => {
      this.admin.getUser(this.hero.username).subscribe(user => {
        this.user = user;
        if (this.user) this.image.download(this.user.photo.id, style).subscribe();
      });
    });
  }

  inHover() {
    const img = document.querySelector('.image img');
    if (img) img.setAttribute('style', this.style.concat('filter: grayscale(0%);'));
  }
  
  outHover() {
    const img = document.querySelector('.image img');
    if (img) img.setAttribute('style', this.style.concat('filter: grayscale(100%);'));
  }
}
