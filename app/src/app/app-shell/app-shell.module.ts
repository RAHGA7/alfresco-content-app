import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Routes, provideRoutes, RouterModule } from '@angular/router';
import { ShellDummyGuard, SHELL_LAYOUT_ROUTE, SHELL_MAIN_ROUTE } from './app-shell.routes';
import { BlankPageComponent, SidenavLayoutModule } from '@alfresco/adf-core';
import { ExtensionService, ExtensionsModule, provideExtensionConfig } from '@alfresco/adf-extensions';
import { ShellLayoutComponent } from './components/layout/shell-layout.component';
import { ContentModule } from '@alfresco/adf-content-services';

@NgModule({
  imports: [SidenavLayoutModule, ContentModule, ExtensionsModule, RouterModule.forChild([]), CommonModule, TranslateModule.forChild()],
  exports: [ShellLayoutComponent],
  declarations: [ShellLayoutComponent],
  providers: [
    provideExtensionConfig(['shell.plugin.json']),
    {
      provide: SHELL_MAIN_ROUTE,
      useValue: SHELL_LAYOUT_ROUTE
    }
  ]
})
export class AppShellModule {
  // static withChildren(_childRouters: Routes, path: string): ModuleWithProviders<AppShellModule> {
  static withChildren(childRouters: Routes, path: string): ModuleWithProviders<AppShellModule> {
    debugger;
    const shellLayoutRoute = SHELL_LAYOUT_ROUTE;
    shellLayoutRoute.children = [...childRouters];
    // eslint-disable-next-line arrow-body-style
    // shellLayoutRoute.loadChildren = () =>
    //   import(path).then((m) => {
    //     debugger;
    //     return m['ContentServiceExtensionModule'];
    //   });

    return {
      ngModule: AppShellModule,
      providers: provideRoutes([shellLayoutRoute])
    };
  }

  constructor(extensions: ExtensionService) {
    extensions.setAuthGuards({
      'app.shell.dummy.guard': ShellDummyGuard
    });

    extensions.setComponents({
      'app.shell.blank': BlankPageComponent
    });
  }
}
