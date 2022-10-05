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

import { BlankPageComponent } from '@alfresco/adf-core';
import { InjectionToken } from '@angular/core';
import { CanActivate, CanActivateChild, Route, Routes } from '@angular/router';
import { ExtensionsDataLoaderGuard } from '../../../../projects/aca-shared/src/public-api';
import { AppLayoutComponent } from '../content-plugin/components/layout/app-layout/app-layout.component';
import { LoginComponent } from '../content-plugin/components/login/login.component';

export const SHELL_AUTH_TOKEN = new InjectionToken<CanActivate & CanActivateChild>('SHELL_AUTH_TOKEN');
export const SHELL_MAIN_ROUTE = new InjectionToken<Route>('SHELL_MAIN_ROUTE');

export const SHELL_ROUTES: Routes = [
  {
    path: 'blank',
    component: BlankPageComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'APP.SIGN_IN'
    }
  }
];

export const SHELL_LAYOUT_ROUTE: Route = {
  path: '',
  component: AppLayoutComponent,
  canActivate: [SHELL_AUTH_TOKEN, ExtensionsDataLoaderGuard],
  children: []
};
