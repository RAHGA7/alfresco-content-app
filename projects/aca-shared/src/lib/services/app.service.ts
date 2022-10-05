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

import { Injectable, InjectionToken } from '@angular/core';
import { AuthenticationService, AppConfigService, AlfrescoApiService } from '@alfresco/adf-core';
import { Observable, BehaviorSubject, Subject, from, combineLatest } from 'rxjs';
import { GroupService, SearchQueryBuilderService } from '@alfresco/adf-content-services';
import { DiscoveryEntry, Group, Person } from '@alfresco/js-api';
import { map, switchMap } from 'rxjs/operators';
import { ContentApiService } from './content-api.service';
import {
  AppState,
  AppStore,
  getCustomCssPath,
  getCustomWebFontPath,
  SetInitialStateAction,
  SetRepositoryInfoAction,
  SetUserProfileAction
} from '../../../store/src/public-api';
import { Store } from '@ngrx/store';
import { INITIAL_APP_STATE } from '../../../../../app/src/app/content-plugin/store/initial-state';

export interface ShellAppService {
  isLoggedIn(): boolean;
  loadAppSettings(): void;

  customCss$?: Observable<string>;
  customWebFont$?: Observable<string>;
  apiError$: Observable<{ status: number; response: any }>;
  appData$: Observable<{
    profileData: {
      person: Person;
      groups: Group[];
    };
    repositoryData: DiscoveryEntry;
  }>;
}

export const INITIAL_APP_COMPONENT_SERVICE = new InjectionToken<ShellAppService>('INITIAL_APP_COMPONENT_SERVICE');

@Injectable({
  providedIn: 'root'
})
export class AppService implements ShellAppService {
  private ready: BehaviorSubject<boolean>;
  ready$: Observable<boolean>;

  private apiErrorSubject$ = new Subject<{ status: number; response: any }>();
  apiError$ = this.apiErrorSubject$.asObservable();

  customCss$: Observable<string>;
  customWebFont$: Observable<string>;

  appData$: Observable<{
    profileData: {
      person: Person;
      groups: Group[];
    };
    repositoryData: DiscoveryEntry;
  }>;

  /**
   * Whether `withCredentials` mode is enabled.
   * Usually means that `Kerberos` mode is used.
   */
  get withCredentials(): boolean {
    return this.config.get<boolean>('auth.withCredentials', false);
  }

  constructor(
    private auth: AuthenticationService,
    private config: AppConfigService,
    searchQueryBuilderService: SearchQueryBuilderService,
    private alfrescoApiService: AlfrescoApiService,
    private groupService: GroupService,
    private contentApi: ContentApiService,
    private store: Store<AppStore>
  ) {
    this.ready = new BehaviorSubject(auth.isLoggedIn() || this.withCredentials);
    this.ready$ = this.ready.asObservable();

    this.alfrescoApiService.getInstance().on('error', (error: { status: number; response: any }) => {
      if (!this.alfrescoApiService.isExcludedErrorListener(error?.response?.req?.url)) {
        this.apiErrorSubject$.next(error);
      }
    });

    this.appData$ = this.auth.onLogin.pipe(
      switchMap(() => combineLatest([this.loadUserProfile(), this.loadRepositoryStatus()])),
      map(([profileData, repositoryData]) => ({
        profileData,
        repositoryData
      }))
    );

    this.appData$.subscribe(({ profileData, repositoryData }) => {
      this.store.dispatch(new SetRepositoryInfoAction(repositoryData.entry.repository));
      this.store.dispatch(new SetUserProfileAction(profileData));
    });

    this.customCss$ = this.store.select(getCustomCssPath);
    this.customWebFont$ = this.store.select(getCustomWebFontPath);

    this.auth.onLogin.subscribe(() => {
      this.ready.next(true);
    });

    this.auth.onLogout.subscribe(() => {
      searchQueryBuilderService.resetToDefaults();
    });
  }

  loadAppSettings() {
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

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  private loadUserProfile(): Observable<{ person: Person; groups: Group[] }> {
    const groupsEntries$ = from(this.groupService.listAllGroupMembershipsForPerson('-me-', { maxItems: 250 })).pipe(
      map((groupsEntries) => (groupsEntries?.length ? groupsEntries.map((obj) => obj.entry) : []))
    );

    const person$ = this.contentApi.getPerson('-me-');

    return combineLatest([person$, groupsEntries$]).pipe(map(([person, groups]) => ({ person: person.entry, groups })));
  }

  private loadRepositoryStatus(): Observable<DiscoveryEntry> {
    return this.contentApi.getRepositoryInformation();
  }
}
