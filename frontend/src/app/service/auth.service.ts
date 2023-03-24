import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginData } from '../model/login-data.model';
import { Role } from '../model/role.model';
import { User } from '../model/user.model';

import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private adminIn = new BehaviorSubject<boolean>(false);
  private token: string | undefined;

  get isLoggedIn(): Observable<boolean> {
    this.loggedIn.next(this.onLogin());
    return this.loggedIn.asObservable();
  }

  get isAdmin(): Observable<boolean> {
    if (this.token != undefined) this.adminIn.next(this.jwtService.decodeToken(this.token).role === Role.ADMIN);
    return this.adminIn.asObservable();
  }

  constructor(private http: HttpClient, private jwtService: JwtService) { }

  setToken(token: string) {
    this.token = JSON.parse(JSON.stringify(token)).token;
    sessionStorage.setItem('token', this.token ? this.token : '');
  }

  getToken() {
    return sessionStorage.getItem('token') ? sessionStorage.getItem('token')! : '';
  }

  getUser(): string {
    return this.jwtService.decodeToken(this.getToken()).sub;
  }

  clearToken() {
    sessionStorage.removeItem('token');
  }

  onLogin(): boolean {
    return sessionStorage.getItem('token') ? true : false;
  }

  onAdmin(): Observable<boolean | any> {
    return this.isAdmin;
  }

  login(userInfo: LoginData): Observable<any | boolean> {
    return this.http.post(environment.baseUrl.concat(environment.loginUrl), userInfo).pipe(map((token: any) => {
      if (userInfo.username && userInfo.password) {
        const role = this.jwtService.decodeToken(token.token).role;
        role === Role.ADMIN || Role.MANAGER ? this.adminIn.next(true) : this.adminIn.next(false);
        this.loggedIn.next(true);
        this.clearToken();
        this.setToken(token);
        return of(true);
      }
      this.loggedIn.next(false);
      this.adminIn.next(false);
      return throwError(() => new Error('Failed login'));
    }));
  }

  signup(user: User): Observable<any | boolean> {
    return this.http.post(environment.baseUrl.concat(environment.signupUrl), user);
  }

  logout(param = true) {
    if (param) {
      this.clearToken();
      this.loggedIn.next(false);
      this.adminIn.next(false);
      setTimeout(() => {}, 500);
      return true;
    }
    return false;
  }
}
