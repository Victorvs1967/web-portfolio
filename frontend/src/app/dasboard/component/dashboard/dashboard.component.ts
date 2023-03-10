import { adminModal } from './../admin-dialog.decorator';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SignupComponent } from 'src/app/auth/component/signup/signup.component';
import { AddProjectComponent } from './component/add-project/add-project.component';
import { AddSkillComponent } from './component/add-skill/add-skill.component';
import { AddImageComponent } from './component/add-image/add-image.component';
import { authModal } from 'src/app/auth/component/auth-dialog.decorator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isAdmin: Observable<boolean> | undefined;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this._reloadCurrentRoute();
  }

  private async _reloadCurrentRoute(): Promise<void> {
    const url = this.router.url;
    const sameUrlStrategy = this.router.onSameUrlNavigation;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    await this.router.navigateByUrl(url);
    this.router.routeReuseStrategy.shouldReuseRoute = (future, curr) => future.routeConfig === curr.routeConfig;
    this.router.onSameUrlNavigation = sameUrlStrategy;
  }

  @authModal(SignupComponent)
  addUser() {
    this.router.navigate(['/admin/listUser']);

  }

  @adminModal(AddProjectComponent)
  addProject() {
    this.router.navigate(['/admin/listProject']);
  }

  @adminModal(AddSkillComponent)
  addSkill() {
    this.router.navigate(['/admin/listSkill']);
  }

  @adminModal(AddImageComponent)
  addImage() {
    this.router.navigate(['/admin/listImage']);
  }

}
