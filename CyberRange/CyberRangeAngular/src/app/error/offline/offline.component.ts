import { PlatformService } from './../../shared/platform.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {  timer, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-offline',
  templateUrl: './offline.component.html',
  styleUrls: ['./offline.component.scss']
})
export class OfflineComponent implements OnInit {
  /*
   *
   * Timer
   * 
   * 
  */
  countDown:Subscription;
  counter: number = 60;
  tick = 1000;
  ConvertStringToNumber(input: string) {
    var numeric = Number(input);
    return numeric;
}


  StartCounter() {
    this.countDown = timer(0, this.tick)
    .subscribe(() => {
      --this.counter;
        if(this.counter <= 0){
          //SET TASK TIME IN LOCAL STORAGE
          //SET TASK STATE TO FINISHED
          window.location.reload();
          this.countDown=null;
        }
      });
  }
  ngOnDestroy(){
    this.countDown=null;
  }

  /*
   *
   * Timer
   * 
   * 
  */


  constructor(
    private toastr: ToastrService,
    private ps: PlatformService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) { }

  result;
  returnUrl;
  ngOnInit(): void {
    this.StartCounter();
    this.ps.IsBackendUp().subscribe(res => {
      this.toastr.success("Server is online!");
      this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
      this.router.navigate([this.returnUrl]);
    }, error => {
      this.toastr.warning("Server is currently offline");
    });
  }

}
