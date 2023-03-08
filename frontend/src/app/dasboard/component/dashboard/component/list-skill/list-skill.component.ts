import { EditSkillComponent } from './../edit-skill/edit-skill.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AnyDataSource } from 'src/app/data/data-source';
import { Skill } from 'src/app/model/skill.model';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-list-skill',
  templateUrl: './list-skill.component.html',
  styleUrls: ['./list-skill.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', padding: '0', margin: '0' })),
      state('expanded', style({ height: '*', margin: '*' })),
      transition('expanded <=> collapsed', animate('400ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListSkillComponent implements OnInit {

  displayedColumns: string[] = [ "name", "description", "percent" ];
  dataSource: any;
  expandedElement: Skill | null | undefined;

  dialogConfig: MatDialogConfig = {
    width: '60%',
    data: {},
  };

  constructor(
    private admin: AdminService,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.reloadData();
  }

  ngOnInit(): void {
    this._reloadCurrentRoute();
  }

  editSkill(skill: Skill) {
    // this.router.navigate(['/admin/editSkill', skill])
    this.dialog.open(EditSkillComponent, this.dialogConfig)
      .afterClosed()
      .subscribe(data => {
        this.admin.editSkill(skill).subscribe({
          next: () => {
            // this.editForm?.reset();
            this.router.navigate(['/admin/listSkill']);
          },
          error: err => alert(err.message)
        });
      }
    );
  }

  deleteSkill(id: string) {
    if (confirm('Are you sure?')) {
      this.admin.deleteSkill(id).subscribe(() => this.reloadData());
    }
  }

  reloadData() {
    this.admin.getSkillList().subscribe(data => this.dataSource = new AnyDataSource([...data]));
  }

  private async _reloadCurrentRoute(): Promise<void> {
    const url = this.router.url;
    const sameUrlStrategy = this.router.onSameUrlNavigation;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    await this.router.navigateByUrl(url);
    this.router.routeReuseStrategy.shouldReuseRoute = (future, curr) => future.routeConfig === curr.routeConfig;
    this.router.onSameUrlNavigation = sameUrlStrategy;
  }


}
