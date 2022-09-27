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

export interface InitialAppComponentService {
  // init(): void;
  isLoggedIn(): boolean; // Observable
  apiError$: Observable<{ status: number; response: any }>;
  // setUp()
  appData$: Observable<{
    profileData: {
      person: Person;
      groups: Group[];
    };
    repositoryData: DiscoveryEntry;
  }>;
}

export const INITIAL_APP_COMPONENT_SERVICE = new InjectionToken<InitialAppComponentService>('INITIAL_APP_COMPONENT_SERVICE');

@Injectable({
  providedIn: 'root'
})
export class AppService implements InitialAppComponentService {
  private ready: BehaviorSubject<boolean>;
  ready$: Observable<boolean>;

  private apiErrorSubject$ = new Subject<{ status: number; response: any }>();
  apiError$ = this.apiErrorSubject$.asObservable();

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
    private contentApi: ContentApiService
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

    this.auth.onLogin.subscribe(() => {
      this.ready.next(true);
    });

    this.auth.onLogout.subscribe(() => {
      searchQueryBuilderService.resetToDefaults();
    });
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  loadUserProfile(): Observable<{ person: Person; groups: Group[] }> {
    const groupsEntries$ = from(this.groupService.listAllGroupMembershipsForPerson('-me-', { maxItems: 250 })).pipe(
      map((groupsEntries) => (groupsEntries?.length ? groupsEntries.map((obj) => obj.entry) : []))
    );

    const person$ = this.contentApi.getPerson('-me-');

    return combineLatest([person$, groupsEntries$]).pipe(map(([person, groups]) => ({ person: person.entry, groups })));
  }

  loadRepositoryStatus(): Observable<DiscoveryEntry> {
    return this.contentApi.getRepositoryInformation();
  }
}
