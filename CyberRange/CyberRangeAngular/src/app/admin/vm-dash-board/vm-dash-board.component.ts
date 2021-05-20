import { VmService } from './../../shared/vm.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vm-dash-board',
  templateUrl: './vm-dash-board.component.html',
  styleUrls: ['./vm-dash-board.component.scss']
})
export class VmDashBoardComponent implements OnInit {


  public resolved : boolean = false;
  public vmList : any = {};

  constructor(
    private vms: VmService
  ) { }



  ngOnInit(): void {
this.vms.GetAllVm().subscribe(res => {
  
  this.vmList = res;
  this.resolved = true;

}, error => {
  console.warn("Unable to get virtual machines");
  console.error(error);
})
  }

}
