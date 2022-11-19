import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm?: UntypedFormGroup;
  isLogin: Observable<boolean> | undefined;
  isAdmin: Observable<boolean> | undefined;

  constructor(private formBuilder: UntypedFormBuilder, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.isLogin = this.auth.isLoggedIn;
    this.auth.onAdmin().subscribe(r => this.isAdmin = r);
  }

  submitLogin() {
    this.auth.login(this.loginForm?.value).subscribe({
      next: () => {
        this.loginForm?.reset();
        this.isAdmin ? this.router.navigate(['/admin']) : this.router.navigate(['/home']);
      },
      error: err => alert(err.message)
    });
  }

}
