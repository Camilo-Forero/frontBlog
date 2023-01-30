import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry-card',
  templateUrl: './entry-card.component.html',
  styleUrls: ['./entry-card.component.css']
})
export class EntryCardComponent implements OnInit {

  @Input() entry:any;

  constructor() { }

  ngOnInit(): void {
  }

}
