import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryDataListComponent } from './entry-data-list.component';

describe('EntryDataListComponent', () => {
  let component: EntryDataListComponent;
  let fixture: ComponentFixture<EntryDataListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryDataListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntryDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
