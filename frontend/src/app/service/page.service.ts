import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from '../model/page.model';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  http = inject(HttpClient);

  getPageList(): Observable<Page[]> {
    return this.http.get<Page[]>(environment.baseUrl.concat(environment.pageUrl));
  }

  getPage(name: string): Observable<Page> {
    return this.http.get<Page>(environment.baseUrl.concat(environment.pageUrl, '/', name));
  }

  addPage(page: Page): Observable<Page> {
    return this.http.post<Page>(environment.baseUrl.concat(environment.pageUrl), page);
  }

  editPage(page: Page): Observable<Page> {
    return this.http.put<Page>(environment.baseUrl.concat(environment.pageUrl), page);
  }

  deletePage(name: string): Observable<Page> {
    return this.http.delete<Page>(environment.baseUrl.concat(environment.pageUrl, '/', name));
  }

}
