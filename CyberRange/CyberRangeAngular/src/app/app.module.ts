import { IconPickerModule } from 'ngx-icon-picker';
import { PipesModule } from './pipes/pipes.module';
import { AdminModule } from './admin/admin.module';
import { PlayerModule } from './Player/player.module';
import { DashboardComponent } from './Player/dashboard/dashboard.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { ErrorService } from './error/error.service';
import { ForbiddenComponent } from './error/forbidden/forbidden.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { RouterModule } from '@angular/router';
import { environment } from './../environments/environment';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';  
import {  NgModule } from '@angular/core';  
  
import { AppRoutingModule } from './app-routing.module';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';  
  
import { AppComponent } from './app.component';  
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';  
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';  
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';  
import { ModalComponent } from './modal/modal.component';  
import { NavMenuComponent } from './nav-menu/nav-menu.component';  
import { HomeComponent } from './home/home.component';
import { RegisterUserComponent } from './register/register-user/register-user.component';
import { LoginComponentComponent } from './login/login-component/login-component.component';  
import { JwtModule } from '@auth0/angular-jwt';
import { PrivacyComponent } from './privacy/privacy.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './footer/footer.component';
import { LyHammerGestureConfig, LyThemeModule, LY_THEME, LY_THEME_NAME, StyleRenderer, LyTheme2 } from '@alyle/ui';
import { MinimaLight } from '@alyle/ui/themes/minima';
import { LyImageCropper, LyImageCropperModule } from '@alyle/ui/image-cropper';
import { FontAwesomePickerComponent } from './font-awesome-picker/font-awesome-picker.component';
import { OfflineComponent } from './error/offline/offline.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
export function tokenGetter(){
  return localStorage.getItem("token");
}  

@NgModule({  
  declarations: [  
    AppComponent,  
    EmployeeListComponent,  
    EmployeeEditComponent,  
    EmployeeDetailComponent,  
    ModalComponent,  
    NavMenuComponent,  
    HomeComponent,
    RegisterUserComponent, 
    LoginComponentComponent, 
    PrivacyComponent, 
    ForbiddenComponent, FooterComponent, FontAwesomePickerComponent, OfflineComponent, NotFoundComponent, 
  ],  
  imports: [  
    BrowserModule,  
    AppRoutingModule,  
    ReactiveFormsModule,    
    FormsModule,    
    HttpClientModule,
    PlayerModule,
    AdminModule,
    PipesModule,
    RouterModule,
    LyImageCropperModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.baseUrl],
        disallowedRoutes: []
      }
    }),
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'offline', component: OfflineComponent },
      { path: 'font-awesome', component: FontAwesomePickerComponent },
      // { path: 'privacy', component: PrivacyComponent, canActivate: [AuthGuard, AdminGuard] },
      { path: 'privacy', component: PrivacyComponent },
      { path: 'forbidden', component: ForbiddenComponent },
      { path: '**', component: NotFoundComponent },
    ]),
    HammerModule    
  ],  
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorService,
    multi: true },
    { provide: HAMMER_GESTURE_CONFIG, useClass: LyHammerGestureConfig }, 
    StyleRenderer, LyTheme2, 
    { provide: LY_THEME_NAME, useValue: 'minima-light' }, 
    { provide: LY_THEME, useClass: MinimaLight, multi: true }
  ],  
  bootstrap: [AppComponent],
  exports: [],
  entryComponents: []
})  
export class AppModule { } 