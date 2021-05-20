import { VmService } from './../../../shared/vm.service';
import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vm-element',
  templateUrl: './vm-element.component.html',
  styleUrls: ['./vm-element.component.scss']
})
export class VmElementComponent implements OnInit {

  @Input() res ;
  @Input() name: string = "unknown";
  @Input() origin: string = "unknown";
  @Input() player;
  isGame = false;

  public originValues : any = {};
  constructor(private toastr: ToastrService, private vms: VmService) { }

  ngOnInit(): void {
    console.log("VM ELEMENT RES");
    console.log(this.res);
    if(this.origin != "unknown"){
      this.originValues = this.origin;
      if(JSON.parse(this.originValues)[0]["GameId"] != undefined){
        this.origin = "Game"
        this.isGame = true;
      }else {
        this.origin = "Task"
      }
    }
  }
  resolved = true;
  DeleteVm() {
    if (confirm('Do you want to delete the virtual machine and all its resources?')){
      this.toastr.info("Deleting virtual machine, this may take some time!")
      this.vms.DeleteVm(this.name).subscribe(res => {
        console.log("VMS res");
        console.log(res);
        this.toastr.success("Vm deleted!");
        this.resolved = false;
      },error => {
        this.toastr.error("Unable to delete vm");
        console.error(error);
      });
    }else {
      this.toastr.info("Vm was not deleted");
    }
  }
  public vmModal:boolean = false;
  ToggleVmModal(){
    this.vmModal = !this.vmModal;
  }

}
