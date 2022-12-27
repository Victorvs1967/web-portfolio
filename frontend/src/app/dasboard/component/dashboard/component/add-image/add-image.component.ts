import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss']
})
export class AddImageComponent implements OnInit {

  // image: { id: string, name: string } = { id: '', name: ''};
  currentFile?: File;
  imageForm?: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder, 
    private images: ImageService,
    public dialogRef: MatDialogRef<AddImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string, name: string },
  ) { }

  ngOnInit(): void {
    this.imageForm = this.formBuilder.group({
      // image: this.image,
      image: this.data,
    });
  }

  selectFile(event: any) {
    this.currentFile = event.target.files[0];
    // if (this.currentFile) this.image.name = this.currentFile.name;
    if (this.currentFile) this.data.name = this.currentFile.name;
  }

  upload(event: any) {
    event.preventDefault();
    // if (this.currentFile) this.images.upload(this.currentFile).subscribe(response => this.image.id = response.id);
    if (this.currentFile) this.images.upload(this.currentFile).subscribe(response => this.data.id = response.id);
  }

  close() {
    this.dialogRef.close();
  }
}
