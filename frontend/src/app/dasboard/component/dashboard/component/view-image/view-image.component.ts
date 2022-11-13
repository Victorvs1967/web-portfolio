import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.scss']
})
export class ViewImageComponent {

  id?: string;

  constructor(private image: ImageService, private route: ActivatedRoute) {
    this.route.params.subscribe(param => {
      this.id = param['id'];
      const style = { width: '100%', height: 'auto', radius: '.5rem' };
      if (this.id) this.image.download(this.id, style).subscribe();
    });
  }
}
