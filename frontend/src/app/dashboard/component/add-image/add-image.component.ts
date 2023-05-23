import { Component, OnInit, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Image } from 'src/app/model/image.model';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss']
})
export class AddImageComponent implements OnInit {

  private formBuilder= inject(UntypedFormBuilder);
  private images= inject(ImageService);
  private router= inject(Router);

  image: Image = { id: '', name: '' };
  currentFile?: File;
  imageForm?: UntypedFormGroup;

  ngOnInit(): void {
    this.imageForm = this.formBuilder.group({
      image: this.image,
    });
  }

  selectFile(event: any) {
    this.currentFile = event.target.files[0];
    if (this.currentFile) this.image.name = this.currentFile.name;
  }

  upload(event: any) {
    event.preventDefault();
    if (this.currentFile) this.images.upload(this.currentFile).subscribe(response => {
      this.image.id = response.id;
      this.router.navigate(['/admin', 'images']);
    });
  }
}
