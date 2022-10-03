/*!
 * @license
 * Alfresco Example Content Application
 *
 * Copyright (C) 2005 - 2020 Alfresco Software Limited
 *
 * This file is part of the Alfresco Example Content Application.
 * If the software was purchased under a paid Alfresco license, the terms of
 * the paid license agreement will prevail.  Otherwise, the software is
 * provided under the following open source license terms:
 *
 * The Alfresco Example Content Application is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The Alfresco Example Content Application is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */
import { PageTitleService } from '@alfresco/adf-core';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';

// Cannot depend on apps
import { CloseModalDialogsAction, AppStore, SetCurrentUrlAction } from '../../../../../../projects/aca-shared/store/src/public-api';
import { INITIAL_APP_COMPONENT_SERVICE, ShellAppService } from '../../../../../../projects/aca-shared/src/lib/services/app.service';
import { RouterExtensionService } from '../../../../../../projects/aca-shared/src/lib/services/router.extension.service';

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent implements OnInit {
  pageHeading = '';

  constructor(
    @Inject(INITIAL_APP_COMPONENT_SERVICE) private shellAppService: ShellAppService,
    private store: Store<AppStore>,
    private router: Router,
    private route: ActivatedRoute,
    private pageTitle: PageTitleService,
    private routerExtensionService: RouterExtensionService
  ) {}

  ngOnInit() {
    this.shellAppService.apiError$.subscribe((error) => {
      this.handleApiError(error);
    });

    this.shellAppService.customCss$?.pipe(take(1)).subscribe((cssPath) => {
      this.createLink(cssPath);
    });

    this.shellAppService.customWebFont$?.pipe(take(1)).subscribe((webFontPath) => {
      this.createLink(webFontPath);
    });

    this.shellAppService.loadAppSettings();

    this.routerExtensionService.mapExtensionRoutes();

    this.router.events
      .pipe(filter((event) => event instanceof ActivationEnd && event.snapshot.children.length === 0))
      .subscribe((event: ActivationEnd) => {
        this.onRouterActivationEnd(event);
      });
  }

  private createLink(url: string): void {
    const cssLinkElement = document.createElement('link');
    cssLinkElement.setAttribute('rel', 'stylesheet');
    cssLinkElement.setAttribute('type', 'text/css');
    cssLinkElement.setAttribute('href', url);
    document.head.appendChild(cssLinkElement);
  }

  private handleApiError(error: { status: number; response: any }): void {
    if (!this.shellAppService.isLoggedIn() && error.status === 401) {
      this.store.dispatch(new CloseModalDialogsAction());

      let redirectUrl = this.route.snapshot.queryParams['redirectUrl'];
      if (!redirectUrl) {
        redirectUrl = this.router.url;
      }

      this.router.navigate(['/login'], {
        queryParams: { redirectUrl }
      });
    }
  }

  private onRouterActivationEnd(event: ActivationEnd): void {
    const snapshot: any = event.snapshot ?? {};
    const data: any = snapshot.data ?? {};

    this.pageHeading = data.title ?? '';
    this.pageTitle.setTitle(data.title ?? '');
    this.store.dispatch(new SetCurrentUrlAction(this.router.url));
  }
}
