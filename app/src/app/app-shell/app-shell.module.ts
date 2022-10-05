import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AppShellComponent } from './components/shell/app-shell.component';
import { RouterModule } from '@angular/router';
import { SHELL_AUTH_TOKEN, SHELL_LAYOUT_ROUTE, SHELL_MAIN_ROUTE, SHELL_ROUTES } from './app-shell.routes';
import { AuthGuard } from '@alfresco/adf-core';

@NgModule({
  imports: [RouterModule.forChild(SHELL_ROUTES), CommonModule, TranslateModule.forRoot()],
  exports: [AppShellComponent],
  declarations: [AppShellComponent],
  providers: [
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
export class AppShellModule {}
