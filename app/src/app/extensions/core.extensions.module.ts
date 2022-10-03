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

import { CoreModule, AuthGuardEcm, UserInfoComponent, NotificationHistoryComponent } from '@alfresco/adf-core';
import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, InjectionToken, Injector, ModuleWithProviders, NgModule, Type } from '@angular/core';
import { AppLayoutComponent } from '../content-plugin/components/layout/app-layout/app-layout.component';
import * as rules from '@alfresco/aca-shared/rules';
import { ToggleInfoDrawerComponent } from '../content-plugin/components/toolbar/toggle-info-drawer/toggle-info-drawer.component';
import { ToggleFavoriteComponent } from '../content-plugin/components/toolbar/toggle-favorite/toggle-favorite.component';
import { ToggleFavoriteLibraryComponent } from '../content-plugin/components/toolbar/toggle-favorite-library/toggle-favorite-library.component';
import { MetadataTabComponent } from '../content-plugin/components/info-drawer/metadata-tab/metadata-tab.component';
import { LibraryMetadataTabComponent } from '../content-plugin/components/info-drawer/library-metadata-tab/library-metadata-tab.component';
import { CommentsTabComponent } from '../content-plugin/components/info-drawer/comments-tab/comments-tab.component';
import { VersionsTabComponent } from '../content-plugin/components/info-drawer/versions-tab/versions-tab.component';
import { ExtensionsModule, ExtensionService } from '@alfresco/adf-extensions';
import { LocationLinkComponent } from '../content-plugin/components/common/location-link/location-link.component';
import { DocumentDisplayModeComponent } from '../content-plugin/components/toolbar/document-display-mode/document-display-mode.component';
import { ToggleJoinLibraryButtonComponent } from '../content-plugin/components/toolbar/toggle-join-library/toggle-join-library-button.component';
import { ToggleJoinLibraryMenuComponent } from '../content-plugin/components/toolbar/toggle-join-library/toggle-join-library-menu.component';
import { ToggleEditOfflineComponent } from '../content-plugin/components/toolbar/toggle-edit-offline/toggle-edit-offline.component';
import { CustomNameColumnComponent } from '../content-plugin/components/dl-custom-components/name-column/name-column.component';
import {
  LibraryNameColumnComponent,
  LibraryStatusColumnComponent,
  TrashcanNameColumnComponent,
  LibraryRoleColumnComponent
} from '@alfresco/adf-content-services';
import { ToggleSharedComponent } from '../content-plugin/components/common/toggle-shared/toggle-shared.component';
import { ViewNodeComponent } from '../content-plugin/components/toolbar/view-node/view-node.component';
import { LanguagePickerComponent } from '../content-plugin/components/common/language-picker/language-picker.component';
import { LogoutComponent } from '../content-plugin/components/common/logout/logout.component';
import { AppExtensionService, ExtensionsDataLoaderGuard } from '@alfresco/aca-shared';
import { PreviewComponent } from '../content-plugin/components/preview/preview.component';
import { ContentServiceExtensionService } from '../content-plugin/services/content-service-extension.service';
// import { DynamicAppHeaderComponent } from '../content-plugin/components/layout/app-layout/app-header/app-header.component';
import { SidenavComponent } from '../content-plugin/components/sidenav/sidenav.component';
import { AppHeaderComponent } from '../content-plugin/components/header/header.component';

export const CONTENT_SERVICE_SETTINGS_TOKEN = new InjectionToken<{ [key in string]: Type<any> }>('COMPONENTS_TOKEN');

export const ACA_COMPONENTS = {
  'app.layout.main': AppLayoutComponent,
  'app.layout.header': AppHeaderComponent,
  // 'app.layout.sidenav': DynamicAppHeaderComponent,
  'app.layout.sidenav': SidenavComponent,
  'app.components.tabs.metadata': MetadataTabComponent,
  'app.components.tabs.library.metadata': LibraryMetadataTabComponent,
  'app.components.tabs.comments': CommentsTabComponent,
  'app.components.tabs.versions': VersionsTabComponent,
  'app.components.preview': PreviewComponent,
  'app.toolbar.toggleInfoDrawer': ToggleInfoDrawerComponent,
  'app.toolbar.toggleFavorite': ToggleFavoriteComponent,
  'app.toolbar.toggleFavoriteLibrary': ToggleFavoriteLibraryComponent,
  'app.toolbar.toggleJoinLibrary': ToggleJoinLibraryButtonComponent,
  'app.toolbar.cardView': DocumentDisplayModeComponent,
  'app.menu.toggleJoinLibrary': ToggleJoinLibraryMenuComponent,
  'app.shared-link.toggleSharedLink': ToggleSharedComponent,
  'app.columns.name': CustomNameColumnComponent,
  'app.columns.libraryName': LibraryNameColumnComponent,
  'app.columns.libraryRole': LibraryRoleColumnComponent,
  'app.columns.libraryStatus': LibraryStatusColumnComponent,
  'app.columns.trashcanName': TrashcanNameColumnComponent,
  'app.columns.location': LocationLinkComponent,
  'app.toolbar.toggleEditOffline': ToggleEditOfflineComponent,
  'app.toolbar.viewNode': ViewNodeComponent,
  'app.languagePicker': LanguagePickerComponent,
  'app.logout': LogoutComponent,
  'app.user': UserInfoComponent,
  'app.notification-center': NotificationHistoryComponent
};

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function setupExtensions(
  service: AppExtensionService,
  _contentServiceExtensionService: ContentServiceExtensionService,
  extensionService: ExtensionService,
  injector: Injector
  // @Inject(COMPONENTS_TOKEN) _acaComponents: { [key in string]: Type<any> },
): () => void {
  debugger;
  const components = injector.get(CONTENT_SERVICE_SETTINGS_TOKEN);
  console.log(components);

  extensionService.setComponents(components);

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

  constructor(public extensions: ExtensionService) {
    extensions.setAuthGuards({
      'app.auth': AuthGuardEcm,
      'app.extensions.dataLoaderGuard': ExtensionsDataLoaderGuard
    });

    extensions.setEvaluators({
      canCopyNode: rules.canCopyNode,
      canToggleJoinLibrary: rules.canToggleJoinLibrary,
      canEditFolder: rules.canEditFolder,
      isTrashcanItemSelected: rules.isTrashcanItemSelected,
      canViewFile: rules.canViewFile,
      canLeaveLibrary: rules.canLeaveLibrary,
      canToggleSharedLink: rules.canToggleSharedLink,
      canShowInfoDrawer: rules.canShowInfoDrawer,
      canManageFileVersions: rules.canManageFileVersions,
      canManagePermissions: rules.canManagePermissions,
      canToggleEditOffline: rules.canToggleEditOffline,
      canToggleFavorite: rules.canToggleFavorite,
      isLibraryManager: rules.isLibraryManager,
      canEditAspects: rules.canEditAspects,
      canInfoPreview: rules.canInfoPreview,
      showInfoSelectionButton: rules.showInfoSelectionButton,

      'app.selection.canDelete': rules.canDeleteSelection,
      'app.selection.file.canUnlock': rules.canUnlockFile,
      'app.selection.file.canLock': rules.canLockFile,
      'app.selection.canDownload': rules.canDownloadSelection,
      'app.selection.notEmpty': rules.hasSelection,
      'app.selection.canUnshare': rules.canUnshareNodes,
      'app.selection.canAddFavorite': rules.canAddFavorite,
      'app.selection.canRemoveFavorite': rules.canRemoveFavorite,
      'app.selection.first.canUpdate': rules.canUpdateSelectedNode,
      'app.selection.file': rules.hasFileSelected,
      'app.selection.file.canShare': rules.canShareFile,
      'app.selection.file.isShared': rules.isShared,
      'app.selection.file.isLocked': rules.hasLockedFiles,
      'app.selection.file.isLockOwner': rules.isUserWriteLockOwner,
      'app.selection.file.canUploadVersion': rules.canUploadVersion,
      'app.selection.library': rules.hasLibrarySelected,
      'app.selection.isPrivateLibrary': rules.isPrivateLibrary,
      'app.selection.hasLibraryRole': rules.hasLibraryRole,
      'app.selection.hasNoLibraryRole': rules.hasNoLibraryRole,
      'app.selection.folder': rules.hasFolderSelected,
      'app.selection.folder.canUpdate': rules.canUpdateSelectedFolder,

      'app.navigation.folder.canCreate': rules.canCreateFolder,
      'app.navigation.folder.canUpload': rules.canUpload,
      'app.navigation.isTrashcan': rules.isTrashcan,
      'app.navigation.isNotTrashcan': rules.isNotTrashcan,
      'app.navigation.isLibraries': rules.isLibraries,
      'app.navigation.isLibraryFiles': rules.isLibraryFiles,
      'app.navigation.isPersonalFiles': rules.isPersonalFiles,
      'app.navigation.isNotLibraries': rules.isNotLibraries,
      'app.navigation.isSharedFiles': rules.isSharedFiles,
      'app.navigation.isNotSharedFiles': rules.isNotSharedFiles,
      'app.navigation.isFavorites': rules.isFavorites,
      'app.navigation.isNotFavorites': rules.isNotFavorites,
      'app.navigation.isRecentFiles': rules.isRecentFiles,
      'app.navigation.isNotRecentFiles': rules.isNotRecentFiles,
      'app.navigation.isSearchResults': rules.isSearchResults,
      'app.navigation.isNotSearchResults': rules.isNotSearchResults,
      'app.navigation.isPreview': rules.isPreview,
      'app.navigation.isSharedPreview': rules.isSharedPreview,
      'app.navigation.isFavoritesPreview': rules.isFavoritesPreview,
      'app.navigation.isSharedFileViewer': rules.isSharedFileViewer,

      'repository.isQuickShareEnabled': rules.hasQuickShareEnabled,
      'user.isAdmin': rules.isAdmin,
      'app.canShowLogout': rules.canShowLogout,
      'app.isContentServiceEnabled': rules.isContentServiceEnabled
    });
  }
}
