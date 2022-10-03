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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TRANSLATION_PROVIDER, AppConfigService, DebugAppConfigService, CoreModule } from '@alfresco/adf-core';
import { ContentModule, ContentVersionService } from '@alfresco/adf-content-services';
import { AppService, INITIAL_APP_COMPONENT_SERVICE, SharedModule } from '@alfresco/aca-shared';

// import { AppComponent } from './app.component';
// import { APP_ROUTES } from './app.routes';

import { AppExtensionsModule } from './extensions.module';
import { environment } from '../environments/environment';

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
import { AppShellComponent } from './app-shell/components/shell/app-shell.component';
// import { CONTENT_SERVICE_SETTINGS_TOKEN, ACA_COMPONENTS } from './extensions/core.extensions.module';
import { ContentUrlService } from './content-plugin/services/content-url.service';
import { AppShellModule } from './app-shell/app-shell.module';
// import { TranslateModule } from '@ngx-translate/core';

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

    CoreModule.forRoot(),
    ContentModule.forRoot(),
    SharedModule.forRoot(),
    // TranslateModule.forRoot(),

    environment.e2e ? NoopAnimationsModule : BrowserAnimationsModule,
    // FormsModule,
    // ReactiveFormsModule,
    RouterModule.forRoot([], {
      useHash: true,
      enableTracing: false, // enable for debug only
      relativeLinkResolution: 'legacy'
    }),

    AppExtensionsModule,
    AppShellModule
    // MaterialModule,
    // CoreModule.forRoot(),
    // ContentModule.forRoot(),
    // SharedModule.forRoot(),
    // AppStoreModule,
    // CoreExtensionsModule.forRoot(),
    // ExtensionsModule.forRoot(),
    // AppLoginModule,
    // AppCommonModule,
    // AppLayoutModule,
    // DirectivesModule,
    // ContextMenuModule,
    // AppInfoDrawerModule,
    // AppToolbarModule,
    // AppSidenavModule,
    // AppCreateMenuModule,
    // DocumentListCustomComponentsModule,
    // AppSearchInputModule,
    // AppSearchResultsModule,
    // AppHeaderModule,
    // AppNodeVersionModule,
    // HammerModule,
    // ViewProfileModule,
  ],
  declarations: [
    // AppComponent,
    // FilesComponent,
    // DetailsComponent,
    // LibrariesComponent,
    // FavoriteLibrariesComponent,
    // FavoritesComponent,
    // RecentFilesComponent,
    // SharedFilesComponent,
    // CreateFromTemplateDialogComponent,
    // HomeComponent
  ],
  providers: [
    { provide: INITIAL_APP_COMPONENT_SERVICE, useClass: AppService },
    // { provide: CONTENT_SERVICE_SETTINGS_TOKEN, useValue: ACA_COMPONENTS },
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
