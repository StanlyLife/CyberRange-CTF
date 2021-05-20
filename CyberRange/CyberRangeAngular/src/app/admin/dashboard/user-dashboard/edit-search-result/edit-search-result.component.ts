import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-search-result',
  templateUrl: './edit-search-result.component.html',
  styleUrls: ['./edit-search-result.component.scss'],
})
export class EditSearchResultComponent implements OnInit {
  public show: boolean = false;
  public showEditModal: boolean = false;
  public buttonName: any = 'Show';

  @Input() FirstName : any;
  @Input() LastName : any;
  @Input() UserName : any;
  @Input() UserId : any;
  @Input() Email : any;
  @Input() ProfilePic : any;
  @Input() BannerPic : any;
  @Input() Points : any;
  @Input() Level : any;
  @Input() Biography: any;
  @Input() Id: any;
  @Input() IsActive: any;


  @Output() myEvent = new EventEmitter<string>();
  callParent() {
    this.myEvent.emit("");
  }

  constructor() {}


  ngOnInit(): void {


  }

  toggle() {
    this.show = !this.show;
  }
  toggleEditModal() {
    this.showEditModal = !this.showEditModal;
  }

}