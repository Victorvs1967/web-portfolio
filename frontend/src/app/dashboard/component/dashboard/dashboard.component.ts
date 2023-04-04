import { AuthService } from 'src/app/service/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SignupComponent } from 'src/app/auth/component/signup/signup.component';
import { AdminService } from 'src/app/service/admin.service';
import { modal } from 'src/app/service/dialog.decorator';
import { AddImageComponent } from '../add-image/add-image.component';
import { AddProjectComponent } from '../add-project/add-project.component';
import { AddSkillComponent } from '../add-skill/add-skill.component';
import { AddPageComponent } from '../add-page/add-page.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  auth = inject(AuthService);
  isAdmin?: Observable<boolean>;

  isExpand: boolean = true;

  constructor(
    private admin: AdminService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.auth.isAdmin;
    this.admin._reloadCurrentRoute();
  }

  @modal(SignupComponent)
  addUser() {
    this.router.navigate(['admin', 'listUser']);
  }

  @modal(AddProjectComponent)
  addProject() {
    this.router.navigate(['admin', 'listProject']);
  }

  @modal(AddSkillComponent)
  addSkill() {
    this.router.navigate(['admin', 'listSkill']);
  }

  @modal(AddImageComponent)
  addImage() {
    this.router.navigate(['admin', 'listImage']);
  }

  @modal(AddPageComponent)
  addPage() {
    this.router.navigate(['admin', 'listPage']);
  }
}
