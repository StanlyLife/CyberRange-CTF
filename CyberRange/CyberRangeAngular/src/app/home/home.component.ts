import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from './../register/register.service';
import { Register } from './../register/register';
import { FormControlName, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];  
  pageTitle = 'Register user';  
  errorMessage: string;  
  tranMode: string;  
  //Is component processing api
  processing = false;
public register : Register = {
  Email:'',
  FirstName:'',
  LastName:'',
  UserName:'',
  Password:'',
  ConfirmPassword:'',
  RegistrationCodeUsed:''
}
  registerForm: FormGroup;
  constructor(
    private registerService : RegisterService,
    private route: ActivatedRoute,  
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthenticationService
    ) {
 }

matrix(){
  // Initialising the canvas
var canvas = document.querySelector('canvas'),
ctx = canvas.getContext('2d');

// Setting the width and height of the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Setting up the letters
var letterss = "ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ";
var letters = letterss.split('');

// Setting up the columns
var fontSize = 10,
columns = canvas.width / fontSize;

// Setting up the drops
var drops = [];
for (var i = 0; i < columns; i++) {
drops[i] = 1;
}

// Setting up the draw function
function draw() {
ctx.fillStyle = 'rgba(34, 36, 52, .1)';
ctx.fillRect(0, 0, canvas.width, canvas.height);
for (var i = 0; i < drops.length; i++) {
var text = letters[Math.floor(Math.random() * letters.length)];
ctx.fillStyle = '#fc0';
ctx.fillText(text, i * fontSize, drops[i] * fontSize);
drops[i]++;
if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
  drops[i] = 0;
}
}
}

// Loop the animation
setInterval(draw, 33);
}


 ngOnInit(): void {
  if(this.authService.isUserAuthenticated()){
    if(this.authService.isUserAdmin()){
      this.router.navigate(["/admin"]); 
    }else {
      this.router.navigate(["/player"]); 
    }
  }
// this.matrix();
  this.route.queryParams.subscribe(params => {
    if(params["register"] && params["register"] === "true"){
      this.scroll("register");      
    }
  });

    
    this.registerForm = new FormGroup({
    Email: new FormControl(this.register.Email, [
      Validators.required,
      // Validators.minLength(4)
    ]),
    FirstName: new FormControl(this.register.FirstName, Validators.required),
    LastName: new FormControl(this.register.LastName, Validators.required),
    UserName: new FormControl(this.register.UserName, [
      Validators.required,
      // Validators.minLength(4),
    ]),
    Password: new FormControl(this.register.Password, [
      Validators.required,
      // Validators.minLength(8)
    ]),
    ConfirmPassword: new FormControl(this.register.ConfirmPassword, [
      Validators.required,
      // Validators.minLength(8),
    ]),
    RegistrationCodeUsed: new FormControl(this.register.RegistrationCodeUsed),
  });
}


registerUser() : void {
if(this.registerForm.valid && this.registerForm.dirty){
  this.processing = true;
    this.register = new Register(this.registerForm.value);
    this.registerService.RegisterUser(this.register)
      .subscribe(  res => {
        this.processing = false;
        this.onSaveComplete();
      },(err: HttpErrorResponse) => {
        console.warn("REGISTER USER ERROR");
        this.processing = false;
        console.error("Unable to register: " + err);
        this.errorMessage = err + "";
      });
    }else {
      this.processing = false;
      this.errorMessage = 'Please correct the validation errors.';  
    }
}

onSaveComplete(): void {  
  this.toastr.success(`Successfully registered ${this.register.UserName}`);
  this.router.navigate(['/login']);
}  

scroll(id) {
  let el = document.getElementById(id);
  el.scrollIntoView();
}

}
