import { RepositoryService } from './../repository/repository.service';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  public claims: [] = [];

  constructor(private http: HttpClient, private repository : RepositoryService) { }

  ngOnInit(): void {
    this.getClaims();
  }

  public getClaims = () =>{
    this.repository.getData('api/user/privacy/claim')
    .subscribe(res => {
      this.claims = res as [];
    }, 
    (error) => {
      console.log("Error on get claim");
      console.log(error);
      // this.repository.NotAuthorized();
    })
  }
}
