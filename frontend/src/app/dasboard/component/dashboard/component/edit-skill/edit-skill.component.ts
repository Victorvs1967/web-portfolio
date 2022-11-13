import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from 'src/app/model/skill.model';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.scss']
})
export class EditSkillComponent implements OnInit {

  skill: Skill = {
    id: null,
    name: '',
    description: '',
    percent: 0
  };

  editForm?: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder, private router: Router, private admin: AdminService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.skill = {
        id: param['id'], 
        name: param['name'], 
        description: param['description'], 
        percent: parseInt(param['percent'])
      };
      this.editForm = this.formBuilder.group({
        name: [this.skill.name, [Validators.required]],
        description: [this.skill.description, [Validators.required]],
        percent: this.skill.percent,
        id: this.skill.id
      });
    })
  }

  submitSkill() {
    const skill: Skill = this.editForm?.value;
    this.admin.editSkill(skill).subscribe({
      next: () => {
        this.editForm?.reset();
        this.router.navigate(['/admin/listSkill']);
      },
      error: err => alert(err.message)
    });
  }
}
