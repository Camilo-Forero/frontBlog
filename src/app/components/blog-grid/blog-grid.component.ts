import { Component, OnInit } from '@angular/core';
import { EntryService } from '../../service/entry.service';
import { SearchEntryService } from '../../service/search-entry.service';

@Component({
  selector: 'app-blog-grid',
  templateUrl: './blog-grid.component.html',
  styleUrls: ['./blog-grid.component.css']
})
export class BlogGridComponent implements OnInit {

  entrys: any = [];

  constructor(
    private entry: EntryService,
    public searchEntry: SearchEntryService
  ) { }

  ngOnInit(): void {
    if(this.searchEntry.entryData.length != 0)
    {
      this.entrys = this.searchEntry.entryData;
    }
    else
    {
      this.entry.getEntrys().forEach((val)=>{
        this.entrys = val;
      });
    };
  }
}
