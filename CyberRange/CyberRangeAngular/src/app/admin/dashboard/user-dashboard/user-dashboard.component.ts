import { SortPipe } from './../../../pipes/sort.pipe';
import { ToastrService } from 'ngx-toastr';
import { error } from 'selenium-webdriver';
import { ProfileService } from './../../../shared/profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  constructor(
    private ps: ProfileService,
    private toastr: ToastrService,
    private sortPipe: SortPipe
  ) { }
    public users = {};
    resolved = false;

  ngOnInit(): void {
    this.ps.getAllUsers().subscribe(res => {
      console.log(res);
      this.users = res;
      this.users = this.sortPipe.transform(res, "desc", "userName");
      this.resolved = true;
    }, error => {
      this.toastr.error("Unable to get all users!");
    });

    
  }
compareStrings(a, b) {
    // Assuming you want case-insensitive comparison
    a = a.toLowerCase();
    b = b.toLowerCase();
  
    return (a < b) ? -1 : (a > b) ? 1 : 0;
  }

}
