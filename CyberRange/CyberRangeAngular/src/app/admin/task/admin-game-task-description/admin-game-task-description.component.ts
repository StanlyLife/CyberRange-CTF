import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admin-game-task-description',
  templateUrl: './admin-game-task-description.component.html',
  styleUrls: ['./admin-game-task-description.component.scss']
})
export class AdminGameTaskDescriptionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() taskName: string;
  @Input() description: string;
  
  @Output() myEvent = new EventEmitter<string>();

  callParent() {
    this.myEvent.emit("");
  }

}

