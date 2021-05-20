import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vm-info-modal',
  templateUrl: './vm-info-modal.component.html',
  styleUrls: ['./vm-info-modal.component.scss']
})
export class VmInfoModalComponent implements OnInit {
  @Input() Name: string;
  @Input() IsGame: string;
  @Input() origin: any;
  @Input() player: any;

  constructor() { }

  ngOnInit(): void {
    this.origin = JSON.parse(this.origin)[0];
    this.player = JSON.parse(this.player);
    console.log(this.origin);
    console.log(this.player);
    console.log("IsGame = " + this.IsGame);
    console.log(typeof(this.IsGame));
  }


  
  @Output() myEvent = new EventEmitter<string>();

  callParent() {
    this.myEvent.emit("");
  }

}
