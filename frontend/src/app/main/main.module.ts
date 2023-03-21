import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './component/home/home.component';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { AboutComponent } from './component/about/about.component';
import { PortfolioComponent } from './component/portfolio/portfolio.component';
import { BlogsComponent } from './component/blogs/blogs.component';
import { ContactsComponent } from './component/contacts/contacts.component';
import { ControlsComponent } from './component/controls/controls.component';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './component/main/main.component';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    AboutComponent,
    PortfolioComponent,
    BlogsComponent,
    ContactsComponent,
    ControlsComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialUiModule,
  ]
})
export class MainModule { }
