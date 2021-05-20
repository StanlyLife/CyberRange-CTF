import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

    loggedin: boolean = false;

  ngOnInit(): void {
    this.loggedin = this.authService.isUserAuthenticated();
  }

  // Logout() {
  //   this.authService.logout();
  //   this.router.navigate(["/login"]);
  // }

}
