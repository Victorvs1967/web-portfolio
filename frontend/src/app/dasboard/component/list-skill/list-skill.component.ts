import { modal } from 'src/app/service/dialog.decorator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AnyDataSource } from 'src/app/data/data-source';
import { Skill } from 'src/app/model/skill.model';
import { AdminService } from 'src/app/service/admin.service';
import { AlertDialogData } from 'src/app/model/alert-dialog.model';
import { AlertComponent } from 'src/app/component/alert/alert.component';
import { EditSkillComponent } from '../edit-skill/edit-skill.component';

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
  static alert: AlertDialogData = {
    title: "A you sure?",
    subtitle: "You can't get access to this skill again.",
    message: "If you realy want to delete this skill,",
  };

  displayedColumns: string[] = [ "name", "description", "percent" ];
  dataSource: any;
  expandedElement: Skill | null | undefined;

  constructor(
    private admin: AdminService,
  ) {
    this.reloadData();
  }

  ngOnInit(): void {
    this.reloadData();
    this.admin._reloadCurrentRoute();
  }

  editSkill(skill: Skill) {
    ListSkillComponent.skill = skill;
    this.getSkill();
  }

  @modal(EditSkillComponent, ListSkillComponent.skill)
  getSkill() {
    this.reloadData();
  }

  @modal(AlertComponent, ListSkillComponent.alert)
  deleteSkill(skill: Skill) {
    if (skill.id) this.admin.deleteSkill(skill.id).subscribe();
  }

  reloadData() {
    this.admin.getSkillList().subscribe(data => this.dataSource = new AnyDataSource([...data]));
  }

}
