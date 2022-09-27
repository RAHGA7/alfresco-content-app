import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AppShellComponent } from './shell/app-shell.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule, CommonModule, TranslateModule.forChild()],
  exports: [AppShellComponent],
  declarations: [AppShellComponent]
})
export class AppShellModule {}
