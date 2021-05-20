import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-statistics-element',
  templateUrl: './statistics-element.component.html',
  styleUrls: ['./statistics-element.component.scss']
})
export class StatisticsElementComponent implements OnInit {



  constructor() { }

  ngOnInit(): void {
  }

  @Input() Name: string;
  @Input() PointsRecieved: string;
  @Input() MaxPoints: string;
  @Input() TimeSpent: string;
  @Input() MaxTime: string;
  
  @Output() myEvent = new EventEmitter<string>();

  callParent() {
    this.myEvent.emit("");
  }

}
