import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-entry-data-list',
  templateUrl: './entry-data-list.component.html',
  styleUrls: ['./entry-data-list.component.css']
})
export class EntryDataListComponent implements OnInit {

  @Input() entry:any;

  constructor() { }

  ngOnInit(): void {
  }

}
