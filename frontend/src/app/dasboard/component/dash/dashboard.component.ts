import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SignupComponent } from 'src/app/auth/component/signup/signup.component';
import { AdminService } from 'src/app/service/admin.service';
import { modal } from 'src/app/service/dialog.decorator';
<<<<<<< HEAD:frontend/src/app/dasboard/component/dashboard/dashboard.component.ts
import { AddImageComponent } from './component/add-image/add-image.component';
import { AddProjectComponent } from './component/add-project/add-project.component';
import { AddSkillComponent } from './component/add-skill/add-skill.component';
=======
import { AddImageComponent } from '../add-image/add-image.component';
import { AddProjectComponent } from '../add-project/add-project.component';
import { AddSkillComponent } from '../add-skill/add-skill.component';
>>>>>>> 33a2497 (correct directory structure):frontend/src/app/dasboard/component/dash/dashboard.component.ts

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isAdmin: Observable<boolean> | undefined;

  constructor(
    private admin: AdminService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.admin._reloadCurrentRoute();
  }

  @modal(SignupComponent)
  addUser() {
    this.router.navigate(['/admin/listUser']);

  }

  @modal(AddProjectComponent)
  addProject() {
    this.router.navigate(['/admin/listProject']);
  }

  @modal(AddSkillComponent)
  addSkill() {
    this.router.navigate(['/admin/listSkill']);
  }

  @modal(AddImageComponent)
  addImage() {
    this.router.navigate(['/admin/listImage']);
  }

}
