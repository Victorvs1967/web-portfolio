import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this._reloadCurrentRoute();
  }

  private async _reloadCurrentRoute(): Promise<void> {
    const url = this._router.url;
    const sameUrlStrategy = this._router.onSameUrlNavigation;
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this._router.onSameUrlNavigation = 'reload';

    await this._router.navigateByUrl(url);

    this._router.routeReuseStrategy.shouldReuseRoute = (future, curr) => future.routeConfig === curr.routeConfig;
    this._router.onSameUrlNavigation = sameUrlStrategy;
  }

}
