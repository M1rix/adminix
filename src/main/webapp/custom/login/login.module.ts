import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LOGIN_ROUTE } from './login.route';
import { LoginComponent } from './login.component';
import { SharedModule } from 'custom/shared/shared.module';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([LOGIN_ROUTE]), SharedModule],
  declarations: [LoginComponent],
})
export class LoginModule {}
