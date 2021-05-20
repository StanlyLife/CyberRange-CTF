import { VmService } from './../../shared/vm.service';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from './../../register/register.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  codeCreateForm: FormGroup;
  //Used to display or hide registration codes
  registrationCodesListVisible: boolean = false;

  RegistrationCodesList: any = {};
  RegistrationCodesModel: any = {
    CodeId: "KCSC",
    MaxUses: 1,
    active: true,
  }
  constructor(
    private registrationService : RegisterService,
    private toastr: ToastrService,
    private vms: VmService
  ) { }

  ngOnInit(): void {

    this.GetAllCodes();
    this.codeCreateForm = new FormGroup({
      Code: 
      new FormControl(this.RegistrationCodesModel.CodeId, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50)
      ]),
      MaxUses: 
      new FormControl(this.RegistrationCodesModel.MaxUses, [
        Validators.required,
      ]),
      Active: 
      new FormControl(this.RegistrationCodesModel.active, [
        Validators.required,
      ]),
    });
  }

  GetAllCodes(){
    this.registrationService.GetAllRegistrationCodes().subscribe(res => {
      this.registrationCodesListVisible = true;
      this.RegistrationCodesList = res;
      console.log(this.RegistrationCodesList);
    },error => {
      this.toastr.error("Unable to get all registrationcodes");
    });
  }

  // @ViewChild('checkbox') myCheckbox;

  AddRegistrationCodes(){
    this.RegistrationCodesModel.active = this.codeCreateForm.value.Active;
    this.RegistrationCodesModel.MaxUses = this.codeCreateForm.value.MaxUses;
    this.RegistrationCodesModel.CodeId = this.codeCreateForm.value.Code;
    console.log(this.RegistrationCodesModel);
    
    
    this.registrationService.AddRegisterCode(this.RegistrationCodesModel).subscribe(res => {
      console.log("reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeees");
      console.log(res);
      this.codeCreateForm.reset();
      this.GetAllCodes();
    },error => {
      console.error(error);
      this.toastr.error("Unable to add new code! Check backend");
    });
  }

  CreateCode(){
    this.AddRegistrationCodes();
  }

  // checkCheckBoxvalue(e){
  //   console.log(e);
  // }

  KillSwitch() {
    if (confirm('Are you sure you want to stop all Virtual machines?')){
      this.toastr.info("Stopping all virtual machines! this may take some time")
      this.vms.KillSwitch().subscribe(res => {
        console.log(res);
        this.toastr.success("Stopped all resources except web server!");
      },error => {
        this.toastr.error("Unable to delete vm");
        console.error(error);
      });
    }else {
      this.toastr.info("Kill switch canceled");
    }
  }

}
