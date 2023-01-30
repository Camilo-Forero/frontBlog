import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { EntryService } from '../../service/entry.service';
import { SearchEntryService } from '../../service/search-entry.service';

@Component({
  selector: 'app-entry-search',
  templateUrl: './entry-search.component.html',
  styleUrls: ['./entry-search.component.css']
})
export class EntrySearchComponent implements OnInit {

  searchForm!: FormGroup;
  entrys?: any = [];

  constructor(
    private entry: EntryService,
    private formB:FormBuilder,
    private searchEntry:SearchEntryService
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formB.group
    (
      {
        tittle: new FormControl(''),
      }
    );
  }

  keyUpFn(event: any)
  {
    let inputSearch = event.target;
    this.entry.getByName({'tittle':inputSearch.value}).forEach((val)=>{
      this.entrys = val;
    });
  }

  bringSearch()
  {
    console.log(this.searchForm.value);
    this.entry.getByName(this.searchForm.value).forEach((val)=>{
      console.log('El cotoplo', val);
      this.searchEntry.entryData = val;
    });
  }
}
