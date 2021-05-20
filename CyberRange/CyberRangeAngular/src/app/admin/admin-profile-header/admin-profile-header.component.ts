import { AuthenticationService } from './../../authentication/authentication.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-profile-header',
  templateUrl: './admin-profile-header.component.html',
  styleUrls: ['./admin-profile-header.component.scss']
})
export class AdminProfileHeaderComponent implements OnInit {

  @Input() userName: string;
  @Input() level: string;
  @Input() levelPercentage: string;
  @Input() role: string;
  @Input() profilePicture: string;
  @Input() bannerPictureUrl: string;

  constructor(private as: AuthenticationService) {  }
  
  ngOnInit(): void {
    this.as.getUser().subscribe(res => {
      this.userName = res["userName"];
      this.profilePicture = res["profilePictureUrl"];
      this.bannerPictureUrl = res["bannerPictureUrl"];
      this.level = '0';
    }, (error) => {
      console.error("ERROR IN GETUSER");
      console.error(error.errorMessage);
    })  
  }

}
