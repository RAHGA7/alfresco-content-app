import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AppShellComponent } from './components/shell/app-shell.component';
import { RouterModule } from '@angular/router';
import { SHELL_ROUTES } from './app-shell.routes';

@NgModule({
  imports: [RouterModule.forChild(SHELL_ROUTES), CommonModule, TranslateModule.forRoot()],
  exports: [AppShellComponent],
  declarations: [AppShellComponent]
})
export class AppShellModule {}
