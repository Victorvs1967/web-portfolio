import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Skill } from 'src/app/model/skill.model';
import { SkillsDataSource } from 'src/app/model/skills-data-source';
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
export class ListSkillComponent {

  displayedColumns: string[] = [ "name", "description", "percent" ];
  dataSource: any;
  expandedElement: Skill | null | undefined;

  constructor(private admin: AdminService, private router: Router) { 
    this.reloadData();
  }

  editSkill(skill: Skill) {
    this.router.navigate(['/admin/editSkill', skill])
  }

  deleteSkill(id: string) {
    if (confirm('Are you sure?')) {
      this.admin.deleteSkill(id).subscribe(() => this.reloadData());
    }
  }

  reloadData() {
    this.admin.getSkillList().subscribe(data => this.dataSource = new SkillsDataSource([...data]));
  }

}
