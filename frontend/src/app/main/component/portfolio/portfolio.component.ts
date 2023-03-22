import { Component, OnInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/model/project.model';
import { AdminService } from 'src/app/service/admin.service';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  github = faGithub;
  eye = faEye;

  projects: Project[] = [];

  constructor(private admin: AdminService, private image: ImageService) {
    this.admin.getProjectList().subscribe(data => {
      data.forEach(project => {
        this.projects = [ ...this.projects, project ];
        const style = { width: '100%', height: '300px', radius: '1rem' };
        this.image.download(project.image.id, style).subscribe();

      });
    });
  }

  ngOnInit(): void {
  }

}
