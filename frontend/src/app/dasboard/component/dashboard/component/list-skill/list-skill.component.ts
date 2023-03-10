import { EditSkillComponent } from './../edit-skill/edit-skill.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AnyDataSource } from 'src/app/data/data-source';
import { Skill } from 'src/app/model/skill.model';
import { AdminService } from 'src/app/service/admin.service';
import { adminModal } from '../../../admin-dialog.decorator';

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

  static skill: Skill;
  
  displayedColumns: string[] = [ "name", "description", "percent" ];
  dataSource: any;
  expandedElement: Skill | null | undefined;

  constructor(
    private admin: AdminService,
  ) {
    this.reloadData();
  }

  ngOnInit(): void {
    this.admin._reloadCurrentRoute();
  }

  editSkill(skill: Skill) {
    ListSkillComponent.skill = skill;
    this.getSkill();
  }

  @adminModal(EditSkillComponent, ListSkillComponent.skill)
  getSkill() {
    this.reloadData();
  }

  deleteSkill(id: string) {
    if (confirm('Are you sure?')) {
      this.admin.deleteSkill(id).subscribe(() => this.reloadData());
    }
  }

  reloadData() {
    this.admin.getSkillList().subscribe(data => this.dataSource = new AnyDataSource([...data]));
  }

}
