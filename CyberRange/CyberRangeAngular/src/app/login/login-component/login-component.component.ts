import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from './../../authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './../login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Login } from './../login.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit {
  loginForm: FormGroup;
  pageTitle = 'Login';
  errorMessage: string;
  returnUrl : string;
  //Processing declares whether the app is waiting for an api
  processing = false;
  public isUserAuthenticated: boolean;
  public login : Login = {
    Email: '',
    Password: '',
  }
  
  
  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute, 
    private router : Router, 
    private authService: AuthenticationService,
    private toastr: ToastrService
    ) { }
  ngOnInit(): void {

    if(this.authService.isUserAuthenticated()){
      if(this.authService.isUserAdmin()){
        this.router.navigate(["/admin"]); 
      }else {
        this.router.navigate(["/player"]); 
      }
    }

    this.loginForm = new FormGroup({
      Email: new FormControl(this.login.Email, [
        Validators.required,
      ]),
      Password: new FormControl(this.login.Password, [
        Validators.required,
      ])
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.authService.authChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
    })
    
  }

  public loginUser = () => {
    this.processing = true;
    this.login = new Login(this.loginForm.value);
    this.loginService.loginUser(this.login)
    .subscribe(res => {
      localStorage.setItem("token", res.token);
       this.errorMessage =  "Logging in";
       this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
       this.onLogin();
    },
    (error) => {
      this.toastr.error("Unable to login! Check username/password");
      this.processing = false;
      this.errorMessage =  "Please check you username and password";
    })
  }

  onLogin(): void {
    this.toastr.success("Logged in!");
    this.loginForm.reset();  
    if(this.returnUrl == "" || this.returnUrl == undefined || this.returnUrl == "/"){
        window.location.reload();
    }else {
      this.router.navigate([this.returnUrl]); 
    }
  }  

}
