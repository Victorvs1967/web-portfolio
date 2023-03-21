import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Image } from 'src/app/model/image.model';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss']
})
export class AddImageComponent implements OnInit {

  currentFile?: File;
  imageForm?: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private images: ImageService,
    @Inject(MAT_DIALOG_DATA) public data: Image,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.imageForm = this.formBuilder.group({
      image: this.data,
    });
  }

  selectFile(event: any) {
    this.currentFile = event.target.files[0];
    if (this.currentFile) this.data.name = this.currentFile.name;
  }

  upload(event: any) {
    event.preventDefault();
    if (this.currentFile) this.images.upload(this.currentFile).subscribe(response => {
      this.data.id = response.id;
      this.router.navigate(['/admin/listImage']);
    });
  }
}
