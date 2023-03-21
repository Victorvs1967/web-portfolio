import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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

  image: { id: string, name: string } = { id: '', name: '' };
  skillsView: { value: Skill, viewValue: string }[] = [];
  skills: Skill[] = [];
  project: Project = {
    id: null,
    name: '',
    description: '',
    image: this.image,
    skills: this.skills,
    links: [],
  };

  currentFile?: File;
  editForm?: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private admin: AdminService,
    private images: ImageService,
  ) {
    this.admin.getSkillList()
      .subscribe(data => data.forEach(item => this.skillsView?.push({ value: item, viewValue: item.name })));
  }

  ngOnInit(): void {
    this.project = ListProjectComponent.project;
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
      this.project.skills.push(this.editForm?.value.skills.value);
      this.admin.editProject(this.project).subscribe();
    }
  }

  selectFile(event: any) {
    this.currentFile = event.target.files[0];
    if (this.currentFile) this.image.name = this.currentFile.name;
  }

  upload(event: any) {
    event.preventDefault();
    if (this.currentFile) this.images.upload(this.currentFile).subscribe(response => this.image.id = response.id);
  }

}
