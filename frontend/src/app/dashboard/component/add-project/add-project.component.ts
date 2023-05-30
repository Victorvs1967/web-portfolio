import { Component, OnInit } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs';
import { Image } from 'src/app/model/image.model';
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

  image: Image = { id: '', name: '' };
  skillsView: { value: Skill, viewValue: string }[] = [];

  currentFile?: File;
  createForm?: UntypedFormGroup;

  public get links() {
    return this.createForm?.get('links') as FormArray;
  }

  constructor(
    private formBuilder: UntypedFormBuilder,
    private admin: AdminService,
    private images: ImageService,
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
      image: this.image,
      skills: [[]],
      // links: this.formBuilder.array([
      //   this.formBuilder.group({
      //     name: ['web'],
      //     link: [''],
      //   }),
      //   this.formBuilder.group({
      //     name: ['github'],
      //     link: [''],
      //   }),
      // ]),
      links: [''],
    });
  }

  submitProject() {
    let project: Project = this.createForm?.value;
    project.name = this.createForm?.value.name;
    project.description = this.createForm?.value.description;
    // project.links = this.createForm?.getRawValue().links;
    project.links = JSON.parse(this.createForm?.value.links);
    project.image = this.createForm?.value.image;
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
      tap(response => this.image!.id = response.id))
    .subscribe();
  }
}
