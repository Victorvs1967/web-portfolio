import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { HeaderComponent } from './component/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { DashboardroutingModule } from './dashboard-routing.module';
import { AddImageComponent } from './component/dashboard/component/add-image/add-image.component';
import { AddProjectComponent } from './component/dashboard/component/add-project/add-project.component';
import { AddSkillComponent } from './component/dashboard/component/add-skill/add-skill.component';
import { EditProjectComponent } from './component/dashboard/component/edit-project/edit-project.component';
import { EditSkillComponent } from './component/dashboard/component/edit-skill/edit-skill.component';
import { EditUserComponent } from './component/dashboard/component/edit-user/edit-user.component';
import { GraphComponent } from './component/dashboard/component/graph/graph.component';
import { ListImageComponent } from './component/dashboard/component/list-image/list-image.component';
import { ProjectListComponent } from './component/dashboard/component/list-image/project-list/project-list.component';
import { ListProjectComponent } from './component/dashboard/component/list-project/list-project.component';
import { ListSkillComponent } from './component/dashboard/component/list-skill/list-skill.component';
import { ListUserComponent } from './component/dashboard/component/list-user/list-user.component';
import { ViewImageComponent } from './component/dashboard/component/view-image/view-image.component';

@NgModule({
  declarations: [
    DashboardComponent,
    GraphComponent,
    HeaderComponent,
    ListUserComponent,
    EditUserComponent,
    ListProjectComponent,
    AddProjectComponent,
    ListSkillComponent,
    AddSkillComponent,
    EditProjectComponent,
    EditSkillComponent,
    AddImageComponent,
    ListImageComponent,
    ViewImageComponent,
    ProjectListComponent,
  ],
  imports: [
    CommonModule,
    MaterialUiModule,
    ReactiveFormsModule,
    NgChartsModule,
    DashboardroutingModule,
  ],
  providers: [ DashboardComponent ],
})
export class DashboardModule { }
