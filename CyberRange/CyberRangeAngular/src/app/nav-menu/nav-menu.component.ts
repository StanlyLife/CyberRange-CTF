import { Router } from '@angular/router';
import { AuthenticationService } from './../authentication/authentication.service';
import { Component, OnInit } from '@angular/core';  
import { ModalService } from '../modal/modal.service';  
import * as signalR from '@microsoft/signalr';  
import { environment } from 'src/environments/environment';  
  
@Component({  
  selector: 'app-nav-menu',  
  templateUrl: './nav-menu.component.html',  
  styleUrls: ['./nav-menu.component.scss']  
})  
export class NavMenuComponent implements OnInit {  
  errorMessage = '';  
  isUserAuthenticated: boolean;
  isUserAdmin: boolean = false;
  
  constructor(
    private modalService: ModalService, 
    private authService: AuthenticationService,
    private router: Router
    ) { 
      this.authService.authChanged
      .subscribe(res => {
        this.isUserAuthenticated = res;
        this.isUserAdmin = this.authService.isUserAdmin();
        console.log(`IsUserAdmin: ${this.isUserAdmin}`);
      })
  }  
  isExpanded = false;  
  
  ngOnInit() {  
  }  
  
  collapse() {  
    this.isExpanded = false;  
  }  
  
  toggle() {  
    this.isExpanded = !this.isExpanded;  
  }  

  

  Logout() {
    this.authService.logout();
  }
  scroll(id) {
    if (this.router.url !== '') {
      this.router.navigateByUrl("/home?register=true");
    }
      
    let el = document.getElementById(id);
    el.scrollIntoView();

  }
}  