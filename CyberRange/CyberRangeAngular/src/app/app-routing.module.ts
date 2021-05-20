import { ForbiddenComponent } from './error/forbidden/forbidden.component';
import { LoginComponentComponent } from './login/login-component/login-component.component';
import { NgModule } from '@angular/core';  
import { Routes, RouterModule } from '@angular/router';  
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';  
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';  
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';  
import { RegisterUserComponent } from './register/register-user/register-user.component';
import { HomeComponent } from './home/home.component';  
  
const routes: Routes = [  
  { path: '', component: HomeComponent, pathMatch: 'full' },  
  {  
    path: 'employees',  
    component: EmployeeListComponent  
  },  
  {  
    path: 'employees/:id',  
    component: EmployeeDetailComponent  
  },  
  {  
    path: 'employees/:id/edit',  
    component: EmployeeEditComponent  
  },
  {  
    path: 'login',  
    component: LoginComponentComponent  
  },    
  {  
    path: 'forbidden',  
    component: ForbiddenComponent  
  },    
]  
  
@NgModule({  
  imports: [RouterModule.forRoot(routes)],  
  exports: [RouterModule]  
})  
export class AppRoutingModule { }  