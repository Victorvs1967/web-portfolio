import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
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

  login(userInfo: { username: string, password: string }): Observable<any | boolean> {
    return this.http.post(environment.baseUrl.concat(environment.loginUrl), userInfo).pipe(map((token: any) => {
      if (this.jwtService.decodeToken(token.token).role === Role.ADMIN) {
        this.clearToken();
        this.setToken(token);
        this.loggedIn.next(true);
        this.adminIn.next(true);
        return of(true);
      } else if (userInfo.username !== '' && userInfo.password !== '') {
        this.clearToken();
        this.setToken(token);
        this.loggedIn.next(true);
        this.adminIn.next(false);
        return of(true);
      }
      this.loggedIn.next(false);
      this.adminIn.next(false);
      return throwError(() => new Error('Failed login'));
    }));
  }

  signup(user: User): Observable<any | boolean> {
    return this.http.post(environment.baseUrl.concat(environment.signupUrl), user)
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
