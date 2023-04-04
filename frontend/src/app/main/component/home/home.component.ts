import { Component } from '@angular/core';
import { map } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { AdminService } from 'src/app/service/admin.service';
import { AuthService } from 'src/app/service/auth.service';
import { ImageService } from 'src/app/service/image.service';
import { MainDataService } from 'src/app/service/main-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  user?: User;
  style = `object-fit: cover; transition: all 0.4s ease-in-out 0s; width: 100%; height: 100%; border-radius: 0.5rem;`;
  hero = { username: 'hero', password: 'password' };
  heroPage: any;

  constructor(
    private image: ImageService,
    private admin: AdminService,
    private auth: AuthService,
    private data: MainDataService,
  ) {
    const style = { width: '100%', height: '100%', radius: '.5rem', filter: 'grayscale(100%)' };
    this.auth.login(this.hero).subscribe(() => {
      this.admin.getUser(this.hero.username).subscribe(user => {
        this.user = user;
        if (this.user) this.image.download(this.user.photo.id, style).subscribe();
      });
    });

    this.getHero();
  }

  inHover() {
    const img = document.querySelector('.image img');
    if (img) img.setAttribute('style', this.style.concat('filter: grayscale(0%);'));
  }

  outHover() {
    const img = document.querySelector('.image img');
    if (img) img.setAttribute('style', this.style.concat('filter: grayscale(100%);'));
  }

  getHero() {
    this.data.loadData()
      .pipe(
        map(data => this.heroPage = data[0].home)
      )
      .subscribe();
  }
}
