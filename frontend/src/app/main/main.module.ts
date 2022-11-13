import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './component/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { AboutComponent } from './component/about/about.component';
import { PortfolioComponent } from './component/portfolio/portfolio.component';
import { BlogsComponent } from './component/blogs/blogs.component';
import { ContactsComponent } from './component/contacts/contacts.component';
import { ControlsComponent } from './component/controls/controls.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'portfolio', component: PortfolioComponent },
      { path: 'blogs', component: BlogsComponent },
      { path: 'contacts', component: ContactsComponent },
    ],
  }
];

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
    RouterModule.forChild(routes),
    MaterialUiModule,
  ]
})
export class HomeModule { }
