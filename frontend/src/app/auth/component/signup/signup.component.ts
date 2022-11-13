import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm?: UntypedFormGroup;
  isLogin: Observable<boolean> | undefined;
  isAdmin: Observable<boolean> | undefined;

  photo = { id: '', name: '' }
  avatar = { id: '', name: '' }
  currentPhoto?: File;
  currentAvatar?: File;

  constructor(private formBuilder: UntypedFormBuilder, private router: Router, private auth: AuthService, private image: ImageService) { }

  ngOnInit(): void {
    this.isLogin = this.auth.isLoggedIn;
    this.isAdmin = this.auth.isAdmin;

    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      firstName: [''],
      lastName: [''],
      phone: [''],
      address: [''],
      photo: this.photo,
      avatar: this.avatar,
    });
  }

  submitSignup() {
    this.auth.signup(this.signupForm?.value).subscribe({
      next: () => {
        this.signupForm?.reset();
        this.isAdmin ? this.router.navigate(['/admin']) : this.router.navigate(['/home']);
      },
      error: err => alert(err.message)
    });
  }

  selectPhoto(event: any) {
    this.currentPhoto = event.target.files[0];
    if (this.currentPhoto) this.photo.name = this.currentPhoto.name;
  }

  uploadPhoto(event: any) {
    event.preventDefault();
    if (this.currentPhoto) this.image.upload(this.currentPhoto).subscribe(response => this.photo.id = response.id);
  }

  selectAvatar(event: any) {
    this.currentAvatar = event.target.files[0];
    if (this.currentAvatar) this.avatar.name = this.currentAvatar.name;
  }

  uploadAvatar(event: any) {
    event.preventDefault();
    if (this.currentAvatar) this.image.upload(this.currentAvatar).subscribe(response => this.avatar.id = response.id);
  }

}
