import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'src/app/model/project.model';
import { Skill } from 'src/app/model/skill.model';
// import { Skill } from 'src/app/model/skill.model';
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

  constructor(private formBuilder: UntypedFormBuilder, private router: Router, private admin: AdminService, private images: ImageService) { 
    this.admin.getSkillList().subscribe(data => 
      data.forEach(item => 
        this.skillsView?.push({ value: item, viewValue: item.name })));
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

    this.admin.addProject(this.project).subscribe({
      next: () => {
        this.createForm?.reset();
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
