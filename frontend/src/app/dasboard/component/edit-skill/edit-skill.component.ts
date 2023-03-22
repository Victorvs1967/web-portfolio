import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Skill } from 'src/app/model/skill.model';
import { AdminService } from 'src/app/service/admin.service';
import { ListSkillComponent } from '../list-skill/list-skill.component';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.scss']
})
export class EditSkillComponent implements OnInit {

  skill?: Skill;

  editForm?: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private admin: AdminService,
  ) { }

  ngOnInit(): void {
    this.skill = ListSkillComponent.skill;
    this.editForm = this.formBuilder.group({
      name: [this.skill.name, [Validators.required]],
      description: [this.skill.description, [Validators.required]],
      percent: this.skill.percent,
      id: this.skill.id
    });
  }

  submitSkill() {
    this.admin.editSkill(this.editForm?.value).subscribe();
  }


}
