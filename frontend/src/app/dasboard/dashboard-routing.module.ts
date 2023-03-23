import { NgModule } from '@angular/core';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { GraphComponent } from './component/graph/graph.component';
import { ListUserComponent } from './component/list-user/list-user.component';
import { AuthGuard } from '../guard/auth.guard';
import { AddImageComponent } from './component/add-image/add-image.component';
import { AddSkillComponent } from './component/add-skill/add-skill.component';
import { EditProjectComponent } from './component/edit-project/edit-project.component';
import { EditSkillComponent } from './component/edit-skill/edit-skill.component';
import { EditUserComponent } from './component/edit-user/edit-user.component';
import { ListImageComponent } from './component/list-image/list-image.component';
import { ListProjectComponent } from './component/list-project/list-project.component';
import { ViewImageComponent } from './component/view-image/view-image.component';
import { ListSkillComponent } from './component/list-skill/list-skill.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard], canDeactivate: [AuthGuard],
    children: [
      { path: '', component: GraphComponent },
      { path: 'listUser', component: ListUserComponent },
      { path: 'editUser/:username', component: EditUserComponent },
      { path: 'listProject', component: ListProjectComponent },
      { path: 'editProject', component: EditProjectComponent },
      { path: 'addSkill', component: AddSkillComponent },
      { path: 'listSkill', component: ListSkillComponent },
      { path: 'editSkill', component: EditSkillComponent },
      { path: 'addImage', component: AddImageComponent },
      { path: 'listImage', component: ListImageComponent },
      { path: 'viewImage/:id', component: ViewImageComponent },
    ]
  },
];

@NgModule({
  declarations: [ ],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [ RouterModule ],
})
export class DashboardroutingModule { }
