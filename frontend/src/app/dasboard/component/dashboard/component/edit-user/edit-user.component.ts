import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from 'src/app/model/role.model';
import { UserRole } from 'src/app/model/user-role.model';
import { User } from 'src/app/model/user.model';
import { AdminService } from 'src/app/service/admin.service';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  roles: UserRole[] = [
    { value: Role.ADMIN, viewValue: 'ADMIN' },
    { value: Role.USER, viewValue: 'USER' },
    { value: Role.MANAGER, viewValue: 'MANAGER' },
  ];

  editForm?: UntypedFormGroup;
  isLogin: Observable<boolean> | undefined;
  isAdmin: Observable<boolean> | undefined;

  user?: User;
  photo = { id: '', name: '' }
  avatar = { id: '', name: '' }
  currentPhoto?: File;
  currentAvatar?: File;

  constructor(private formBuilder: UntypedFormBuilder, private router: Router, private admin: AdminService, private image: ImageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.admin.getUser(param['username']).subscribe(user => {
        this.user = user;
        this.photo = user.photo;
        this.avatar = user.avatar;
        this.editForm = this.formBuilder.group({
          username: [user.username, [Validators.required]],
          email: [user.email, [Validators.required, Validators.email]],
          firstName: [user.firstName],
          lastName: [user.lastName],
          phone: [user.phone],
          address: [user.address],
          role: [user.role],
          photo: this.photo,
          avatar: this.avatar,
        });
      });
    });
  }

  submitEdit() {
    if (this.user) {
      this.user.username = this.editForm?.value.username;
      this.user.email = this.editForm?.value.email;
      this.user.firstName = this.editForm?.value.firstName;
      this.user.lastName = this.editForm?.value.lastName;
      this.user.phone = this.editForm?.value.phone;
      this.user.address = this.editForm?.value.address;
      this.user.role = this.editForm?.value.role;
      this.user.photo = this.editForm?.value.photo || this.photo;
      this.user.avatar = this.editForm?.value.avatar || this.avatar;
      this.admin.editUser(this.user).subscribe({
        next: () => {
          this.editForm?.reset();
          this.router.navigate(['/admin/listUser']);
        },
        error: err => alert(err.message)
      });
    }
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
