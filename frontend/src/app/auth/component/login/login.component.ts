import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';
import { LoginData } from 'src/app/model/login-data.model';
import { SignupComponent } from '../signup/signup.component';
import { modal } from 'src/app/service/dialog.decorator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm?: UntypedFormGroup;
  isLogin: Observable<boolean> | undefined;
  isAdmin: Observable<boolean> | undefined;

  constructor(
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
    this.auth.login(this.loginForm?.value).subscribe(() => this.router.navigate(['admin']));
  }

  @modal(SignupComponent)
  signup() {
    this.router.navigate(['admin']);
  }
}
