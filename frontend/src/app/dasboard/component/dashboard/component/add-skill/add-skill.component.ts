import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Skill } from 'src/app/model/skill.model';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.scss']
})
export class AddSkillComponent implements OnInit {
  
  createForm?: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder, 
    public dialogRef: MatDialogRef<AddSkillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Skill,
  ) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      percent: [''],
    });
  }

  submitSkill() {
    this.dialogRef.close(this.createForm?.value);
  }

  close() {
    this.dialogRef.close();
  }

}
