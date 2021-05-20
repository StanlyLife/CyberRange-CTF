import { AuthenticationService } from './../../authentication/authentication.service';
import { createCustomElement } from '@angular/elements';
import { Component, Input, OnInit, Output, Injector } from '@angular/core';

@Component({
  selector: 'app-profileheader',
  templateUrl: './profileheader.component.html',
  styleUrls: ['./profileheader.component.scss'],
})

export class ProfileheaderComponent implements OnInit{
  
  @Input() userName: string;
  @Input() level: number;
  @Input() levelPercentage: number;
  @Input() role: string;
  @Input() profilePicture: string;
  @Input() bannerPictureUrl: string;

  constructor(private as: AuthenticationService) {

  }
  
  ngOnInit(): void {
    this.as.getUser().subscribe(res => {
      this.userName = res["userName"];
      this.profilePicture = res["profilePictureUrl"];
      if(res["profilePictureUrl"] = "" || res["profilePictureUrl"] == undefined){
        this.profilePicture = "/assets/Profileheader/robot.jpg"
      }
      this.bannerPictureUrl = res["bannerPictureUrl"];
      this.level = res["level"] + 0;
      this.levelPercentage = ((res["totalPoints"] + 0) / (((this.level**2) * 10) + (this.level * 10))) * 100;
      console.log(res);
    }, (error) => {
      console.error("ERROR IN GETUSER");
      console.error(error.errorMessage);
    })  
  }

}
