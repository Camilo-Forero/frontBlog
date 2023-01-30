import { TestBed } from '@angular/core/testing';

import { SearchEntryService } from './search-entry.service';

describe('SearchEntryService', () => {
  let service: SearchEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
