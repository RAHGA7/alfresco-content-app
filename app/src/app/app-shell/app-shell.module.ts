import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AppShellComponent } from './components/shell/app-shell.component';
import { RouterModule } from '@angular/router';
import { ShellLoginGuard, SHELL_AUTH_TOKEN, SHELL_LAYOUT_ROUTE, SHELL_MAIN_ROUTE, SHELL_ROUTES } from './app-shell.routes';
import { AuthGuard, SidenavLayoutModule } from '@alfresco/adf-core';
import { ExtensionService, ExtensionsModule, provideExtensionConfig } from '@alfresco/adf-extensions';
import { ShellLayoutComponent } from './components/layout/shell-layout.component';
import { ContentModule } from '@alfresco/adf-content-services';

@NgModule({
  imports: [
    SidenavLayoutModule,
    ContentModule,
    ExtensionsModule,
    RouterModule.forRoot(SHELL_ROUTES, {
      useHash: true,
      enableTracing: false, // enable for debug only
      relativeLinkResolution: 'legacy'
    }),
    CommonModule,
    TranslateModule.forChild()
  ],
  exports: [AppShellComponent, ShellLayoutComponent],
  declarations: [AppShellComponent, ShellLayoutComponent],
  providers: [
    provideExtensionConfig(['shell.plugin.json']),
    {
      provide: SHELL_AUTH_TOKEN,
      useClass: AuthGuard
    },
    {
      provide: SHELL_MAIN_ROUTE,
      useValue: SHELL_LAYOUT_ROUTE
    }
  ]
})
export class AppShellModule {
  constructor(extensions: ExtensionService) {
    extensions.setAuthGuards({
      'app.shell.login.guard': ShellLoginGuard
    });
  }
}
