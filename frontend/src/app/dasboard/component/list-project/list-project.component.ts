import { modal } from 'src/app/service/dialog.decorator';
import { EditProjectComponent } from '../edit-project/edit-project.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AnyDataSource } from 'src/app/data/data-source';
import { Project } from 'src/app/model/project.model';
import { AdminService } from 'src/app/service/admin.service';
import { ImageService } from 'src/app/service/image.service';
import { AlertDialogData } from 'src/app/model/alert-dialog.model';
import { map } from 'rxjs';
import { AlertComponent } from 'src/app/component/alert/alert.component';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', padding: '0', margin: '0' })),
      state('expanded', style({ height: '*', margin: '*' })),
      transition('expanded <=> collapsed', animate('400ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListProjectComponent implements OnInit {

  static project: Project;
  static alert: AlertDialogData = {
    title: "A you sure?",
    subtitle: "You can't get access to this project again.",
    message: "If you realy want to delete this project,",
  };

  displayedColumns: string[] = [ "name", "image", "description", "skills", "links" ];
  dataSource: any;
  expandedElement: Project | null | undefined;

  img?: string;

  constructor(
    private admin: AdminService,
    private images: ImageService,
  ) {
    this.reloadData();
  }

  ngOnInit(): void {
    this.reloadData();
    this.admin._reloadCurrentRoute();
  }

  editProject(project: Project) {
    ListProjectComponent.project = project;
    this.getProject();
  }

  @modal(EditProjectComponent, ListProjectComponent.project)
  getProject() {
  }

  @modal(AlertComponent, ListProjectComponent.alert)
  deleteProject(id: string) {
    this.admin.deleteProject(id)
      .subscribe();
  }

  reloadData() {
    this.admin.getProjectList()
      .pipe(map(data => this.dataSource = new AnyDataSource([...data])))
      .subscribe();
  }

  readImg(id: string): void {
    const style = { width: '100%', height: 'auto', radius: '.5rem' };
    this.images.download(id, style)
      .subscribe();
  }

}