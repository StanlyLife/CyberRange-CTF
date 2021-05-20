import { RegisterUserComponent } from './register-user/register-user.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: RegisterUserComponent}
    ])
  ]
})
export class RegisterModule { }
