import { ToastrService } from 'ngx-toastr';
import { ProfileService } from './../../../../shared/profile.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-player-modal',
  templateUrl: './player-modal.component.html',
  styleUrls: ['./player-modal.component.scss']
})
export class PlayerModalComponent implements OnInit {


  @Input() FirstName : any;
  @Input() LastName : any;
  @Input() UserName : any;
  @Input() UserId : any;
  @Input() Email : any;
  @Input() ProfilePic : any;
  @Input() BannerPic : any;
  @Input() Points : any;
  @Input() Level : any;
  @Input() Biography: any;
  @Input() Id: any;
  @Input() IsActive: any;
  
  @Input() state: string;

  public resolved = false;
  public pf: FormGroup;
  public ProfileForm : any = {};
  
  constructor(
    private ps:ProfileService,
    private toastr: ToastrService
  ) { }
  
  ngOnInit(): void {
    this.ps.GetUserRole(this.Id).subscribe(res => {
      let currentRole = "";
      if(!res[0]+"" != 'undefined' && !res[0]+"" != '' && !res[0]+"" != '[]' ){
        currentRole = res[0]+"";
      }
      console.log(res);
      this.ProfileForm  = {
        Email : this.Email,
        Password : "",
        Level: this.Level,
        Points: this.Points,
        FirstName: this.FirstName,
        LastName: this.LastName,
        UserName: this.UserName,
        Id: this.Id,
        Role: currentRole,
      };
      this.pf = new FormGroup({
        Email: new FormControl(this.ProfileForm.Email),
        Level: new FormControl(this.ProfileForm.Level),
        Points: new FormControl(this.ProfileForm.Points),
        fn: new FormControl(this.ProfileForm.FirstName),
        ln: new FormControl(this.ProfileForm.LastName),
        un: new FormControl(this.ProfileForm.UserName),
        np: new FormControl(this.ProfileForm.Password),
        id: new FormControl(this.ProfileForm.Id),
        Role: new FormControl(this.ProfileForm.Role),
      });
      this.resolved = true;
    }, error => {
      this.toastr.error("Unable to get userroles for user: " + this.UserName);
    })
    
  }

  @Output() myEvent = new EventEmitter<string>();
  callParent() {
    this.myEvent.emit("");
  }

DeactivateUser(){
  this.ps.DeactivateUser(this.Id).subscribe(res => {
    if(res+"" == 'true'){
      this.toastr.success("User deactivated");this.callParent();
    }else {
      this.toastr.info("Nothing happened!");
    }
  },error => {
    this.toastr.error("Unable to deactivate user");
  });
}
ActivateUser(){
  this.ps.ActivateUser(this.Id).subscribe(res => {
    if(res+"" == 'true'){
      this.toastr.success("User activated");this.callParent();
    }else {
      this.toastr.info("Nothing happened!")
    }
  },error => {
    this.toastr.error("Unable to activate user");
  });
}

DeleteUser(){
  this.ps.DeleteUser(this.Id).subscribe(res => {
    if(res+"" == 'true'){
      this.toastr.success("User deleted");this.callParent();
    }else {
      this.toastr.info("Nothing happened!")
    }
  },error => {
    this.toastr.error("Unable to delete user");
  });
}

  UpdateUser() {
    this.ProfileForm  = {
      Email : this.pf.value.Email,
      Password : this.pf.value.np,
      Level: this.pf.value.Level,
      Points: this.pf.value.Points,
      FirstName: this.pf.value.fn,
      LastName: this.pf.value.ln,
      UserName: this.pf.value.un,
      Id: this.pf.value.id,
      Role: this.pf.value.Role,
    };
    console.log(this.ProfileForm);
    this.ps.UpdateUserAsAdmin(this.ProfileForm).subscribe(res => {
      console.log("Update user as admin res");
      console.log(res);
      if(res+"" == 'true'){
        this.toastr.success("User updated");
        this.callParent();
      }else {
        this.toastr.info("Nothing was updated");
      }
    },error => {
      this.toastr.error("Unable to update profile");
      console.error(error);
    })
  }
}
