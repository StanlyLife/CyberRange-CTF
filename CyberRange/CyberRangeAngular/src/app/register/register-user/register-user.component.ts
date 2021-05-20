import { ToastrService } from 'ngx-toastr';
import { RegisterService } from './../register.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit,ElementRef, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';  
import { Register } from '../register';
import { Subscription } from 'rxjs';  
import { Console } from 'console';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})


export class RegisterUserComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];  
  pageTitle = 'Register user';  
  errorMessage: string;  
  tranMode: string;  
  // register: Register;
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
    private toastr: ToastrService
    ) {
 }


  ngOnInit(): void {

    this.registerForm = new FormGroup({
      Email: new FormControl(this.register.Email, [
        Validators.required,
        Validators.minLength(4)
      ]),
      FirstName: new FormControl(this.register.FirstName),
      LastName: new FormControl(this.register.LastName, Validators.required),
      UserName: new FormControl(),
      Password: new FormControl(),
      ConfirmPassword: new FormControl(),
      Token: new FormControl(),
    });
  }

  btnClick() : void {
    console.log("clicked");
  }

registerUser() : void {
  if(this.registerForm.valid && this.registerForm.dirty){
    this.register = new Register(this.registerForm.value);
    this.registerService.RegisterUser(this.register)
    .subscribe(res => {
      this.onSaveComplete();
    },(error: any) => {
      this.errorMessage = <any>error;
      console.error(this.errorMessage);
      this.toastr.error("error on create user");
    } 
    );
  }else {
    this.toastr.error("The form is not valid, fix errors!");
    this.errorMessage = 'Please correct the validation errors.';  
  }
}

onSaveComplete(): void { 
  this.toastr.success(`Successfully registered ${this.register.UserName}`);
  this.router.navigate(['/login']);
  // this.registerForm.reset();  
  }  
}
