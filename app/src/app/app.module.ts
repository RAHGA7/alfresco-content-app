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

import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TRANSLATION_PROVIDER, CoreModule, AppConfigService, DebugAppConfigService, ContextMenuModule } from '@alfresco/adf-core';
import { ContentModule, ContentVersionService } from '@alfresco/adf-content-services';
import { AppService, INITIAL_APP_COMPONENT_SERVICE, SharedModule } from '@alfresco/aca-shared';

// import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';

import { FilesComponent } from './content-plugin/components/files/files.component';
import { LibrariesComponent } from './content-plugin/components/libraries/libraries.component';
import { FavoriteLibrariesComponent } from './content-plugin/components/favorite-libraries/favorite-libraries.component';
import { ViewProfileModule } from './content-plugin/components/view-profile/view-profile.module';

import { MaterialModule } from './material.module';
import { AppExtensionsModule } from './extensions.module';
import { AppInfoDrawerModule } from './content-plugin/components/info-drawer/info.drawer.module';
import { ExtensionsModule } from '@alfresco/adf-extensions';
import { AppToolbarModule } from './content-plugin/components/toolbar/toolbar.module';
import { AppCreateMenuModule } from './content-plugin/components/create-menu/create-menu.module';
import { AppSidenavModule } from './content-plugin/components/sidenav/sidenav.module';
import { AppCommonModule } from './content-plugin/components/common/common.module';
import { AppLayoutModule } from './content-plugin/components/layout/layout.module';
import { AppSearchInputModule } from './content-plugin/components/search/search-input.module';
import { DocumentListCustomComponentsModule } from './content-plugin/components/dl-custom-components/document-list-custom-components.module';
import { AppSearchResultsModule } from './content-plugin/components/search/search-results.module';
import { AppLoginModule } from './content-plugin/components/login/login.module';
import { AppHeaderModule } from './content-plugin/components/header/header.module';
import { AppNodeVersionModule } from './content-plugin/components/node-version/node-version.module';
import { FavoritesComponent } from './content-plugin/components/favorites/favorites.component';
import { RecentFilesComponent } from './content-plugin/components/recent-files/recent-files.component';
import { SharedFilesComponent } from './content-plugin/components/shared-files/shared-files.component';
import { environment } from '../environments/environment';
import { DetailsComponent } from './content-plugin/components/details/details.component';
import { HomeComponent } from './content-plugin/components/home/home.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeDe from '@angular/common/locales/de';
import localeIt from '@angular/common/locales/it';
import localeEs from '@angular/common/locales/es';
import localeJa from '@angular/common/locales/ja';
import localeNl from '@angular/common/locales/nl';
import localePt from '@angular/common/locales/pt';
import localeNb from '@angular/common/locales/nb';
import localeRu from '@angular/common/locales/ru';
import localeCh from '@angular/common/locales/zh';
import localeAr from '@angular/common/locales/ar';
import localeCs from '@angular/common/locales/cs';
import localePl from '@angular/common/locales/pl';
import localeFi from '@angular/common/locales/fi';
import localeDa from '@angular/common/locales/da';
import localeSv from '@angular/common/locales/sv';
import { AppShellModule } from '../../../projects/aca-shared/src/lib/app-shell/feature/app-shell.module';
import { AppShellComponent } from '../../../projects/aca-shared/src/lib/app-shell/feature/shell/app-shell.component';
import { DirectivesModule } from './content-plugin/directives/directives.module';
import { CoreExtensionsModule, CONTENT_SERVICE_SETTINGS_TOKEN, ACA_COMPONENTS } from './content-plugin/extensions/core.extensions.module';
import { AppStoreModule } from './content-plugin/store/app-store.module';
import { CreateFromTemplateDialogComponent } from './content-plugin/dialogs/node-template/create-from-template.dialog';
import { ContentUrlService } from './content-plugin/services/content-url.service';

registerLocaleData(localeFr);
registerLocaleData(localeDe);
registerLocaleData(localeIt);
registerLocaleData(localeEs);
registerLocaleData(localeJa);
registerLocaleData(localeNl);
registerLocaleData(localePt);
registerLocaleData(localeNb);
registerLocaleData(localeRu);
registerLocaleData(localeCh);
registerLocaleData(localeAr);
registerLocaleData(localeCs);
registerLocaleData(localePl);
registerLocaleData(localeFi);
registerLocaleData(localeDa);
registerLocaleData(localeSv);

@NgModule({
  imports: [
    BrowserModule,
    environment.e2e ? NoopAnimationsModule : BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(APP_ROUTES, {
      useHash: true,
      enableTracing: false, // enable for debug only
      relativeLinkResolution: 'legacy'
    }),
    MaterialModule,
    CoreModule.forRoot(),
    ContentModule.forRoot(),
    SharedModule.forRoot(),
    AppStoreModule,
    CoreExtensionsModule.forRoot(),
    ExtensionsModule.forRoot(),
    AppExtensionsModule,
    AppLoginModule,
    AppCommonModule,
    AppLayoutModule,
    DirectivesModule,
    ContextMenuModule,
    AppInfoDrawerModule,
    AppToolbarModule,
    AppSidenavModule,
    AppCreateMenuModule,
    DocumentListCustomComponentsModule,
    AppSearchInputModule,
    AppSearchResultsModule,
    AppHeaderModule,
    AppNodeVersionModule,
    HammerModule,
    ViewProfileModule,
    AppShellModule
  ],
  declarations: [
    // AppComponent,
    FilesComponent,
    DetailsComponent,
    LibrariesComponent,
    FavoriteLibrariesComponent,
    FavoritesComponent,
    RecentFilesComponent,
    SharedFilesComponent,
    CreateFromTemplateDialogComponent,
    HomeComponent
  ],
  providers: [
    { provide: INITIAL_APP_COMPONENT_SERVICE, useClass: AppService },
    { provide: CONTENT_SERVICE_SETTINGS_TOKEN, useValue: ACA_COMPONENTS },
    { provide: AppConfigService, useClass: DebugAppConfigService },
    { provide: ContentVersionService, useClass: ContentUrlService },
    {
      provide: TRANSLATION_PROVIDER,
      multi: true,
      useValue: {
        name: 'app',
        source: 'assets'
      }
    }
  ],
  // bootstrap: [AppComponent]
  bootstrap: [AppShellComponent]
})
export class AppModule {}
