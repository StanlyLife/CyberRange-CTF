import { FormGroup, Validators, FormControl, FormControlName, FormBuilder } from '@angular/forms';
import { ProfileService } from './../../shared/profile.service';
import { ToastrService } from 'ngx-toastr';
import { ImgCropperConfig, ImgCropperErrorEvent, ImgCropperEvent, LyImageCropper } from '@alyle/ui/image-cropper';
import { Component, OnInit, ViewChild, ViewChildren, ElementRef } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  //When user is retrieved;
  resolved : boolean = false;

  changeImageModal: boolean = false;
  croppedImage?: string;
  headerCroppedImage?: string;
  ready: boolean;
  HeaderIsReady: boolean;
  scale: number;
  minScale: number;
  headerImageExists : boolean = false;
  DisplayHeader : boolean = true;
  @ViewChild(LyImageCropper, { static: true }) cropper: LyImageCropper;
  PfConfig: ImgCropperConfig = {
    width: 250, // Default `250`
    height: 250, // Default `200`
    type: 'image/png', // Or you can also use `image/jpeg`
    round: true,
    maxFileSize: 2500000000, //MAX file size: 2,5mb
    output: {
      width: 250,
      height: 250,
    }
  };
  HeaderConfig: ImgCropperConfig = {
    width: 1292, // Default `250`
    height: 242, // Default `200`
    type: 'image/png', // Or you can also use `image/jpeg`
    round: false,
    keepAspectRatio: true,
    maxFileSize: 2500000000,
    output: {
      width: 1292,
      height: 242,
    }
  };

  


  public user = {};
  pf: FormGroup;
  public ProfileForm : any = {
    Biography: "",
    Password: "",
    PhoneNumber: "",
  };

  
  constructor(
    private toastr: ToastrService,
    private profileService: ProfileService,
  ) {
  }

  ngOnInit(): void {

    this.profileService.getUser().subscribe(res => {
      this.user = res;
      this.ProfileForm.Biography = res["biography"];
      this.ProfileForm.PhoneNumber = res["phoneNumber"];

      this.pf = new FormGroup({
        Biography: new FormControl(this.ProfileForm.Biography),
        Password: new FormControl(this.ProfileForm.Password),
        Phonenumber: new FormControl(this.ProfileForm.PhoneNumber),
      });


      //PROFILE PICTURE
      if(this.user["profilePictureUrl"] !== "" && this.user["profilePictureUrl"] !== undefined && this.user["profilePictureUrl"] !== null){
        this.croppedImage = this.user["profilePictureUrl"];
      }else{
        this.croppedImage = "../../../../assets/square.jfif";
      }
      
      //PROFILE BANNER PICTURE
      if(this.headerCroppedImage == "" || this.headerCroppedImage == undefined && this.user["bannerPictureUrl"] !== ""){
        this.headerCroppedImage = this.user["bannerPictureUrl"];
        this.headerImageExists = true;
      }else{
        this.headerCroppedImage = "";
      }
      this.resolved = true;
    }, error => {
      this.toastr.error("Unable to get user!");
      //TODO
      //logout and redirect
    })

  }

  /**
   *
   */

  public Url = {
    Url: "",
  }

  ChangeProfilePicture(){
    this.imgready();
  }
  SaveHeaderImage(){
    
  }

  onHeaderCropped(e: ImgCropperEvent) {
    this.resolved = false;
    this.headerCroppedImage = e.dataURL;
    this.HeaderIsReady = false;
    this.Url.Url = this.headerCroppedImage;
    this.profileService.UpdateProfileBannerPicture(this.Url).subscribe(res => {
      console.log(res);
      this.DisplayHeader = true;
      this.toastr.success("Updated header picture!");
      this.resolved = true;
    }, error => {
      this.toastr.error("ERROR");
      this.resolved = true;
    });
  }
  onCropped(e: ImgCropperEvent) {
    this.resolved = false;
    this.croppedImage = e.dataURL;
    this.Url.Url = this.croppedImage;
    this.profileService.UpdateProfilePicture(this.Url).subscribe(res => {
      console.log(res);
      this.toastr.success("Updated profile picture!");
      this.resolved = true;
    }, error => {
      this.toastr.error("ERROR");
      this.resolved = true;
    });
  }

  onReady(e: ImgCropperEvent) {
    this.ready = true;
  }
  HeaderReady(e: ImgCropperEvent) {
    this.HeaderIsReady = true;
  }
  imgready() {
    this.ready = true;
  }

  onError(e: ImgCropperErrorEvent) {
    this.toastr.error("ERROR! " + e.errorMsg);
  }


  ToggleImageModal() {
    this.changeImageModal = !this.changeImageModal;
  }

  UpdateUser(){
    this.resolved = false;
    // this.profileService.ChangeMyUserRole("Admin").subscribe(res => {
    //   this.toastr.success("Youre now admin");
    // }, error => {
    //   this.toastr.error("profile not updated");
    // });
    this.profileService.UpdateProfile(this.pf.value).subscribe(res => {
      this.toastr.success("Profile updated!");
      this.resolved = true;
    }, error => {
      this.resolved = true;
      this.toastr.error("Unable to update profile, backend error");
    });
  }

  ToggleHeaderImage(){
    this.DisplayHeader = !this.DisplayHeader;
  }

}
