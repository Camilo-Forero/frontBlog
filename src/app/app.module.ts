import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogGridComponent } from './components/blog-grid/blog-grid.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { EntryFormComponent } from './components/entry-form/entry-form.component';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EntryCardComponent } from './components/entry-card/entry-card.component';
import { EntryPageComponent } from './components/entry-page/entry-page.component';
import { EntrySearchComponent } from './components/entry-search/entry-search.component';
import { EntryDataListComponent } from './components/entry-data-list/entry-data-list.component';

import { EntryService } from './service/entry.service';
import { EntryResolve } from './resolver/entry.resolver';
import { SearchEntryService } from './service/search-entry.service';

@NgModule({
  declarations: [
    AppComponent,
    BlogGridComponent,
    NavBarComponent,
    EntryFormComponent,
    EntryCardComponent,
    EntryPageComponent,
    EntrySearchComponent,
    EntryDataListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    EntryService,
    EntryResolve,
    SearchEntryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
