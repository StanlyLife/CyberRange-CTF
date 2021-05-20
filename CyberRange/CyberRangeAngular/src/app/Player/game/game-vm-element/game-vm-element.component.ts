import { error } from 'selenium-webdriver';
import { ActivatedRoute } from '@angular/router';
import { VmService } from './../../../shared/vm.service';
import { ToastrService } from 'ngx-toastr';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-vm-element',
  templateUrl: './game-vm-element.component.html',
  styleUrls: ['./game-vm-element.component.scss']
})
export class GameVmElementComponent implements OnInit {

  constructor(
  private toastr: ToastrService,
  private vms: VmService,
  private activatedRoute: ActivatedRoute
  ) { 
    if(this.gameId == "" || this.gameId == undefined || this.gameId == "undefined"){
      this.gameId =  this.activatedRoute.snapshot.paramMap.get('id');
    }
  }

  @Input() type: string;
  @Input() gameId: string;
  @Input() taskId: string;
  vmName: string = "deploying"
  vmIp: string = "deploying"

  ngOnInit(): void {
    if(this.type == "task" && this.taskId != undefined && this.taskId != "undefined"){
      this.GetVmInfoForTask();
    }else{
      this.GetVmInfo();
    }
  }
  @Output() myEvent = new EventEmitter<string>();

  GetVmInfoForTask = () => {
    this.vms.GetVmInfoByGameTask(+this.taskId, +this.gameId).subscribe(res => {
      if(res["computerName"] == ("" || null || undefined)){
        this.toastr.warning("Still deploying, please wait...");
        if(this.vmIp.substr(this.vmIp.length - 3) == "..."){
          this.vmIp = "Chill, its coming!";
        }else {
          this.vmIp += ".";
        }
        if(this.vmName.substr(this.vmName.length - 3) == "..."){
          this.vmName = "Chill, its coming!";
        }else {
          this.vmName += ".";
        }
      }else {
        this.toastr.success("Got vm name");
        this.vmName = res["computerName"];
        
      }
    },(error)=> {
      this.toastr.error("Unable to get vm info");
    })
    this.vms.GetVmIpforTask(+this.taskId,+this.gameId).subscribe(res => {
      if(res+"" == ("" || undefined || null)) {
        this.toastr.warning("Still deploying, please wait...");
      }else {
        console.log("IP");
        console.log(res);
        this.vmIp = res["ip"];
      }
    },
    (error) => {
      this.toastr.error("Unable to get ip");
    })
  }
  public GetVmInfo = () => {
    this.gameId =  this.activatedRoute.snapshot.paramMap.get('id');
    this.vms.GetVmInfoByGame(+this.gameId).subscribe(res => {
      console.log("VM INFO:");
      if(res["computerName"] == ("" || null || undefined)){
        this.toastr.warning("Still deploying, please wait...");
        if(this.vmIp.substr(this.vmIp.length - 3) == "..."){
          this.vmIp = "Chill, its coming!";
        }else {
          this.vmIp += ".";
        }
        if(this.vmName.substr(this.vmName.length - 3) == "..."){
          this.vmName = "Chill, its coming!";
        }else {
          this.vmName += ".";
        }
      }else {
        this.toastr.success("Got vm name");
        this.vmName = res["computerName"];
        
      }
    },(error)=> {
      this.toastr.error("Unable to get vm info");
    })
    this.vms.GetVmIpfoByGame(+this.gameId).subscribe(res => {
      if(res+"" == ("" || undefined || null)) {
        this.toastr.warning("Still deploying, please wait...");
      }else {
        console.log("IP");
        console.log(res);
        this.vmIp = res["ip"];
      }
    },
    (error) => {
      this.toastr.error("Unable to get ip");
    })
  }

  callParent() {
    this.myEvent.emit("");
  }
}
