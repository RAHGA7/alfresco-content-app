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

import { CoreModule } from '@alfresco/adf-core';
import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { ExtensionsModule, ExtensionService } from '@alfresco/adf-extensions';
import { AppExtensionService } from '@alfresco/aca-shared';
import { ContentServiceExtensionService } from '../content-plugin/services/content-service-extension.service';

// export const CONTENT_SERVICE_SETTINGS_TOKEN = new InjectionToken<{ [key in string]: Type<any> }>('COMPONENTS_TOKEN');

// export const ACA_COMPONENTS = {
//   'app.layout.main': AppLayoutComponent,
//   'app.layout.header': AppHeaderComponent,
//   // 'app.layout.sidenav': DynamicAppHeaderComponent,
//   'app.layout.sidenav': SidenavComponent,
//   'app.components.tabs.metadata': MetadataTabComponent,
//   'app.components.tabs.library.metadata': LibraryMetadataTabComponent,
//   'app.components.tabs.comments': CommentsTabComponent,
//   'app.components.tabs.versions': VersionsTabComponent,
//   'app.components.preview': PreviewComponent,
//   'app.toolbar.toggleInfoDrawer': ToggleInfoDrawerComponent,
//   'app.toolbar.toggleFavorite': ToggleFavoriteComponent,
//   'app.toolbar.toggleFavoriteLibrary': ToggleFavoriteLibraryComponent,
//   'app.toolbar.toggleJoinLibrary': ToggleJoinLibraryButtonComponent,
//   'app.toolbar.cardView': DocumentDisplayModeComponent,
//   'app.menu.toggleJoinLibrary': ToggleJoinLibraryMenuComponent,
//   'app.shared-link.toggleSharedLink': ToggleSharedComponent,
//   'app.columns.name': CustomNameColumnComponent,
//   'app.columns.libraryName': LibraryNameColumnComponent,
//   'app.columns.libraryRole': LibraryRoleColumnComponent,
//   'app.columns.libraryStatus': LibraryStatusColumnComponent,
//   'app.columns.trashcanName': TrashcanNameColumnComponent,
//   'app.columns.location': LocationLinkComponent,
//   'app.toolbar.toggleEditOffline': ToggleEditOfflineComponent,
//   'app.toolbar.viewNode': ViewNodeComponent,
//   'app.languagePicker': LanguagePickerComponent,
//   'app.logout': LogoutComponent,
//   'app.user': UserInfoComponent,
//   'app.notification-center': NotificationHistoryComponent
// };

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function setupExtensions(
  service: AppExtensionService,
  _contentServiceExtensionService: ContentServiceExtensionService,
  _extensionService: ExtensionService,
  _injector: Injector
  // @Inject(COMPONENTS_TOKEN) _acaComponents: { [key in string]: Type<any> },
): () => void {
  debugger;
  // const components = injector.get(CONTENT_SERVICE_SETTINGS_TOKEN);
  // console.log(components);

  // extensionService.setComponents(components);

  return () => service.load();
}

@NgModule({
  imports: [CommonModule, CoreModule.forChild(), ExtensionsModule]
})
export class CoreExtensionsModule {
  static forRoot(): ModuleWithProviders<CoreExtensionsModule> {
    debugger;

    return {
      ngModule: CoreExtensionsModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: setupExtensions,
          deps: [AppExtensionService, ContentServiceExtensionService, ExtensionService, Injector],
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
