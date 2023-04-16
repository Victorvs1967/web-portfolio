import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Page } from 'src/app/model/page.model';
import { PageService } from 'src/app/service/page.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.sass']
})
export class AddPageComponent implements OnInit {

  createForm?: UntypedFormGroup;
  page?: Page;

  constructor(
    private formBuilder: FormBuilder,
    private pageService: PageService,
    @Inject(MAT_DIALOG_DATA) public data: Page,
  ) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      name: ['', [ Validators.required ]],
      title: [''],
      subtitle: [''],
      description: [''],
      payload: [''],
    });
  }

  submitPage() {
    this.page = this.createForm?.value;
    if (this.page) {
      this.page.payload = JSON.parse(this.createForm?.value.payload);
      this.pageService.addPage(this.page)
        .subscribe();
    }
  }

}
