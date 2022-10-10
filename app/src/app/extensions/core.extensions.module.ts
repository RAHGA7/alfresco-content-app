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

import { AuthGuard, CoreModule } from '@alfresco/adf-core';
import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { ExtensionService, ExtensionsModule } from '@alfresco/adf-extensions';
import { AppExtensionService } from '@alfresco/aca-shared';
import { LoginComponent } from '../content-plugin/components/login/login.component';
import { SHELL_AUTH_TOKEN } from '../app-shell/app-shell.routes';
import { AppShellModule } from '../app-shell/app-shell.module';
import { CONTENT_LAYOUT_ROUTES } from '../content-plugin/content.routes';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function setupExtensions(service: AppExtensionService): () => void {
  return () => service.load();
}

@NgModule({
  imports: [CommonModule, CoreModule.forChild(), ExtensionsModule, AppShellModule.withChildren(CONTENT_LAYOUT_ROUTES.children)],
  providers: [
    {
      provide: SHELL_AUTH_TOKEN,
      useClass: AuthGuard
    }
  ]
})
export class CoreExtensionsModule {
  constructor(extensions: ExtensionService) {
    extensions.setComponents({
      'app.shell.login': LoginComponent
    });
  }

  static forRoot(): ModuleWithProviders<CoreExtensionsModule> {
    return {
      ngModule: CoreExtensionsModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: setupExtensions,
          deps: [AppExtensionService],
          multi: true
        }
      ]
    };
  }

  static forChild(): ModuleWithProviders<CoreExtensionsModule> {
    return {
      ngModule: CoreExtensionsModule
    };
  }
}
