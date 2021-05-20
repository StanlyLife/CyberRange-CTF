import { ToastrService } from 'ngx-toastr';
import { RegisterService } from './../../register/register.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-code-element',
  templateUrl: './registration-code-element.component.html',
  styleUrls: ['./registration-code-element.component.scss']
})
export class RegistrationCodeElementComponent implements OnInit {
  codeUpdateForm: FormGroup;
  @Input() code: string;
  @Input() maxUses: number;
  @Input() currentUses: number;
  @Input() active: any;

  //will be true when information is loaded
  resolved: boolean = false;

  RegistrationCodesModel: any = {
    CodeId: "",
    MaxUses: 1,
    active: false,
  }
  constructor(
    private rs: RegisterService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.active = (this.active == "true");
    this.RegistrationCodesModel.CodeId = this.code;
    this.RegistrationCodesModel.MaxUses = this.maxUses;
    this.RegistrationCodesModel.active = this.active;
    this.RegistrationCodesModel.CurrentUses = this.currentUses;


    this.codeUpdateForm = new FormGroup({
      MaxUses: 
      new FormControl(this.maxUses, [
        Validators.required,
      ]),
      Active: 
      new FormControl(this.active, [
        Validators.required,
      ]),
    });
    this.resolved = true;
  }

  UpdateCode(){
    this.RegistrationCodesModel.MaxUses = this.codeUpdateForm.value.MaxUses;
    this.RegistrationCodesModel.active = this.codeUpdateForm.value.Active;
    console.log(this.RegistrationCodesModel);
    this.rs.UpdateRegistrationModel(this.RegistrationCodesModel).subscribe(res => {
      console.log(res);
      this.toastr.success("Code updated!");
    },error => {
      this.toastr.error("Unable to update code");
      console.error(error);
    });
  }

  DeleteCode(){
    this.rs.DeleteRegistrationCode(this.code).subscribe(res => {
      if(res+"" == "true"){
        this.toastr.success("Deleted code!");
        this.resolved=false;
      }else {
        this.toastr.warning("Something happened, unable to delete code");
      }
    });
  }

}
