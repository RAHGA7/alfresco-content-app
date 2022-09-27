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
import { AppConfigService, PageTitleService } from '@alfresco/adf-core';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

// Cannot depend on apps
import { INITIAL_APP_STATE } from '../../../../../../../app/src/app/content-plugin/store/initial-state';
import {
  CloseModalDialogsAction,
  AppStore,
  getCustomCssPath,
  getCustomWebFontPath,
  AppState,
  SetInitialStateAction,
  SetCurrentUrlAction,
  SetRepositoryInfoAction,
  SetUserProfileAction
} from '../../../../../store/src/public-api';
import { INITIAL_APP_COMPONENT_SERVICE, InitialAppComponentService as ShellAppService } from '../../../services/app.service';
import { RouterExtensionService } from '../../../services/router.extension.service';

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html'
  // styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent implements OnInit {
  pageHeading = '';

  constructor(
    @Inject(INITIAL_APP_COMPONENT_SERVICE) private shellAppService: ShellAppService,
    // private appService: AppService,
    private store: Store<AppStore>,
    private router: Router,
    private route: ActivatedRoute,
    private config: AppConfigService,
    private pageTitle: PageTitleService,
    private routerExtensionService: RouterExtensionService
  ) {}

  ngOnInit() {
    // extensionService = layout

    // this.shellAppService.init();

    this.shellAppService.apiError$.subscribe((error) => {
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
    });

    this.loadAppSettings();
    this.loadCustomCss();
    this.loadCustomWebFont();
    this.routerExtensionService.mapExtensionRoutes();

    this.router.events
      .pipe(filter((event) => event instanceof ActivationEnd && event.snapshot.children.length === 0))
      .subscribe((event: ActivationEnd) => {
        const snapshot: any = event.snapshot ?? {};
        const data: any = snapshot.data ?? {};

        this.pageHeading = data.title ?? '';
        this.pageTitle.setTitle(data.title ?? '');
        this.store.dispatch(new SetCurrentUrlAction(this.router.url));
      });

    // repositoryData - DiscoveryEntry - change to my type or needed??
    this.shellAppService.appData$.subscribe(({ profileData, repositoryData }) => {
      this.store.dispatch(new SetRepositoryInfoAction(repositoryData.entry.repository));
      this.store.dispatch(new SetUserProfileAction(profileData));
    });
  }

  private loadCustomCss(): void {
    this.store.select(getCustomCssPath).subscribe((cssPath) => {
      if (cssPath) {
        this.createLink(cssPath);
      }
    });
  }

  private loadCustomWebFont(): void {
    this.store.select(getCustomWebFontPath).subscribe((fontUrl) => {
      if (fontUrl) {
        this.createLink(fontUrl);
      }
    });
  }

  private loadAppSettings() {
    let baseShareUrl = this.config.get<string>('baseShareUrl');
    if (!baseShareUrl.endsWith('/')) {
      baseShareUrl += '/';
    }

    const state: AppState = {
      ...INITIAL_APP_STATE,
      appName: this.config.get<string>('application.name'),
      headerColor: this.config.get<string>('headerColor'),
      headerTextColor: this.config.get<string>('headerTextColor', '#000000'),
      logoPath: this.config.get<string>('application.logo'),
      headerImagePath: this.config.get<string>('application.headerImagePath'),
      customCssPath: this.config.get<string>('customCssPath'),
      webFontPath: this.config.get<string>('webFontPath'),
      sharedUrl: baseShareUrl
    };

    this.store.dispatch(new SetInitialStateAction(state));
  }

  private createLink(url: string): void {
    const cssLinkElement = document.createElement('link');
    cssLinkElement.setAttribute('rel', 'stylesheet');
    cssLinkElement.setAttribute('type', 'text/css');
    cssLinkElement.setAttribute('href', url);
    document.head.appendChild(cssLinkElement);
  }
}
