import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs';
import { Project } from 'src/app/model/project.model';
import { Skill } from 'src/app/model/skill.model';
import { AdminService } from 'src/app/service/admin.service';
import { ImageService } from 'src/app/service/image.service';
import { ListProjectComponent } from '../list-project/list-project.component';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

  image: any;
  skillsView: { value: Skill, viewValue: string }[] = [];
  project: Project;

  currentFile?: File;
  editForm?: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private admin: AdminService,
    private images: ImageService,
  ) {
    this.project = ListProjectComponent.project;
    this.admin.getSkillList()
      .pipe(map(data =>
        data.map(i =>
          this.skillsView = [ ...this.skillsView, { value: i, viewValue: i.name}])))
      .subscribe();
  }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      name: [this.project.name, [Validators.required]],
      description: [this.project.description, [Validators.required]],
      image: [this.project.image],
      links: [this.project.links.toString()],
      skills: [this.project.skills],
      id: [this.project.id],
    });
  }

  submitProject() {
    if (this.project) {
      this.project.name = this.editForm?.value.name;
      this.project.description = this.editForm?.value.description;
      this.project.links = this.editForm?.value.links.split(',').map((link: string) => link.trim());
      this.project.image = this.editForm?.value.image || this.image;
      this.project.skills = [ ...this.editForm?.value.skills ];
      this.admin.editProject(this.project).subscribe();
    }
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
