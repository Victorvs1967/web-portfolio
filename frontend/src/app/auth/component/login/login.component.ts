import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';
import { LoginData } from 'src/app/model/login-data.model';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm?: UntypedFormGroup;
  isLogin: Observable<boolean> | undefined;
  isAdmin: Observable<boolean> | undefined;

  dialogConfig: MatDialogConfig = {
    width: '60%',
    data: {},
  };

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoginData,
    private formBuilder: UntypedFormBuilder, 
    private router: Router, 
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.isLogin = this.auth.isLoggedIn;
    this.auth.onAdmin().subscribe(r => this.isAdmin = r);
  }

  submitLogin() {
    this.dialogRef.close(this.loginForm?.value);
  }

  close(): void {
    this.dialogRef.close();
  }

  signup() {
    this.dialog.open(SignupComponent, this.dialogConfig)
      .afterClosed()
      .subscribe(
        data => {
          this.auth.signup(data).subscribe({
              next: () => this.isAdmin ? this.router.navigate(['/admin']) : this.router.navigate(['/home']),
              error: err => alert(err.message)
            });
        }
      );
  }
}
