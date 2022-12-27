import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/model/project.model';
import { Skill } from 'src/app/model/skill.model';
import { AdminService } from 'src/app/service/admin.service';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  image = { id: '', name: '' }
  skillsView: { value: Skill, viewValue: string }[] = [];
  skills: Skill[] = [];
  project: Project = {
    id: null,
    name: '',
    description: '',
    image: this.image,
    skills: [],
    links: [],
  };

  currentFile?: File;
  createForm?: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder, 
    private admin: AdminService, 
    private images: ImageService,
    public dialogRef: MatDialogRef<AddProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project,
  ) { 
    this.admin.getSkillList().subscribe(
      data => data.forEach(
        item => this.skillsView?.push({ value: item, viewValue: item.name })
      )
    );
  }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: [this.image],
      skills: [ this.skillsView ],
      links: [''],
    });
}

  submitProject() {
    this.project.name = this.createForm?.value.name;
    this.project.description = this.createForm?.value.description;
    this.project.skills.push(this.createForm?.value.skills.value);
    this.project.links = this.createForm?.value.links.split(',').map((link: string) => link.trim());
    this.project.image = this.image;

    this.dialogRef.close(this.project);
  }  

  close() {
    this.dialogRef.close();
  }

  selectFile(event: any) {
    this.currentFile = event.target.files[0];
    if (this.currentFile) this.image.name = this.currentFile.name;
  }

  upload(event: any) {
    event.preventDefault();
    if (this.currentFile) this.images.upload(this.currentFile).subscribe(
      response => this.image.id = response.id
    );
  }
}
