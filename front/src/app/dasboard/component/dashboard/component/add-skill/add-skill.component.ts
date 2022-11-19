import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Skill } from 'src/app/model/skill.model';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.scss']
})
export class AddSkillComponent implements OnInit {
  
  createForm?: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder, private router: Router, private admin: AdminService) { }

  ngOnInit(): void {
        this.createForm = this.formBuilder.group({
          name: ['', [Validators.required]],
          description: ['', [Validators.required]],
          percent: [''],
        });
  }

  submitSkill() {
    const skill: Skill = this.createForm?.value;

    this.admin.addSkill(skill).subscribe({
      next: () => {
        this.createForm?.reset();
        this.router.navigate(['/admin/listSkill']);
      },
      error: err => alert(err.message)
    });
  }
}
