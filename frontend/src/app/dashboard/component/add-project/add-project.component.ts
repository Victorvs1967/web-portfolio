import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, tap } from 'rxjs';
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

  image: any;
  skillsView: { value: Skill, viewValue: string }[] = [];

  currentFile?: File;
  createForm?: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private admin: AdminService,
    private images: ImageService,
    @Inject(MAT_DIALOG_DATA) public data: Project,
  ) {
    this.admin.getSkillList()
      .pipe(
        map(data => data
          .map(item => this.skillsView = [...this.skillsView, { value: item, viewValue: item.name }])))
      .subscribe();
  }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: [this.image],
      skills: [[]],
      links: [''],
    });
  }

  submitProject() {
    let project: Project = this.createForm?.value;
    project.name = this.createForm?.value.name;
    project.description = this.createForm?.value.description;
    project.links = this.createForm?.value.links.split(',').map((link: string) => link.trim());
    project.image = this.createForm?.value.image || this.image;
    project.skills = [...this.createForm?.value.skills];
    this.admin.addProject(project).subscribe();
  }

  selectFile(event: any) {
    this.currentFile = event.target.files[0];
    if (this.currentFile) this.image.name = this.currentFile.name;
  }

  upload(event: any) {
    event.preventDefault();
    if (this.currentFile) this.images.upload(this.currentFile)
    .pipe(
      tap(response => this.image.id = response.id))
    .subscribe();
  }
}
