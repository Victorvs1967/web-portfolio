import { Component, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/model/project.model';
import { Skill } from 'src/app/model/skill.model';
import { AdminService } from 'src/app/service/admin.service';
import { ImageService } from 'src/app/service/image.service';

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

  constructor(private formBuilder: UntypedFormBuilder, private router: Router, private admin: AdminService, private images: ImageService, private route: ActivatedRoute) { 
    this.admin.getSkillList().subscribe(data => 
      data.forEach(item => 
        this.skillsView?.push({ value: item, viewValue: item.name })));
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.admin.getProject(param['id']).subscribe(project => {
        this.project = project;
        this.image = project.image;
        this.skills = project.skills;
        this.editForm = this.formBuilder.group({
          name: [project.name, [Validators.required]],
          description: [project.description, [Validators.required]],
          image: [project.image],
          links: [project.links.toString()],
          skills: [project.skills],
        });
      })
    })
  }

  submitProject() {
    this.project.name = this.editForm?.value.name;
    this.project.description = this.editForm?.value.description;
    this.project.links = this.editForm?.value.links.split(',').map((link: string) => link.trim());
    this.project.image = this.editForm?.value.image || this.image;
    this.project.skills.push(this.editForm?.value.skills.value);
    this.admin.editProject(this.project).subscribe({
      next: () => {
        this.editForm?.reset();
        this.router.navigate(['/admin/listProject']);
      },
      error: err => alert(err.message)
    });
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
