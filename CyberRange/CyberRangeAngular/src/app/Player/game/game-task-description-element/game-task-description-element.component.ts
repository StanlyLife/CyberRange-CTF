import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-task-description-element',
  templateUrl: './game-task-description-element.component.html',
  styleUrls: ['./game-task-description-element.component.scss']
})
export class GameTaskDescriptionElementComponent implements OnInit {

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
