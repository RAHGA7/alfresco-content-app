import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AppShellComponent } from './components/shell/app-shell.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule, CommonModule, TranslateModule.forRoot()],
  exports: [AppShellComponent],
  declarations: [AppShellComponent]
})
export class AppShellModule {}
