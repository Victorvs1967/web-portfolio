import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './component/dash/dashboard.component';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { HeaderComponent } from './component/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { DashboardroutingModule } from './dashboard-routing.module';
import { AddImageComponent } from './component/add-image/add-image.component';
import { AddProjectComponent } from './component/add-project/add-project.component';
import { AddSkillComponent } from './component/add-skill/add-skill.component';
import { EditProjectComponent } from './component/edit-project/edit-project.component';
import { EditSkillComponent } from './component/edit-skill/edit-skill.component';
import { EditUserComponent } from './component/edit-user/edit-user.component';
import { GraphComponent } from './component/graph/graph.component';
import { ListImageComponent } from './component/list-image/list-image.component';
import { ProjectListComponent } from './component/list-image/project-list/project-list.component';
import { ListUserComponent } from './component/list-user/list-user.component';
import { ViewImageComponent } from './component/view-image/view-image.component';
// import { ListProjectComponent } from './component/list-project/list-project.component';
// import { ListSkillComponent } from './component/list-skill/list-skill.component';

@NgModule({
  declarations: [
    DashboardComponent,
    GraphComponent,
    HeaderComponent,
    ListUserComponent,
    EditUserComponent,
    AddProjectComponent,
    AddSkillComponent,
    EditProjectComponent,
    EditSkillComponent,
    AddImageComponent,
    ListImageComponent,
    ViewImageComponent,
    ProjectListComponent,
    // ListProjectComponent,
    // ListSkillComponent,
  ],
  imports: [
    CommonModule,
    MaterialUiModule,
    ReactiveFormsModule,
    NgChartsModule,
    DashboardroutingModule,
  ],
  providers: [ ],
})
export class DashboardModule { }
