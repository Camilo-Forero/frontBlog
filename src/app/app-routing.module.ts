import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogGridComponent } from './components/blog-grid/blog-grid.component';
import { EntryFormComponent } from './components/entry-form/entry-form.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { EntryPageComponent } from './components/entry-page/entry-page.component';
import { EntryResolve } from './resolver/entry.resolver';

const routes: Routes =
[
  {path:'', component:BlogGridComponent},
  {path:'entry', component:EntryFormComponent},
  {path:'entry/:id', component:EntryPageComponent, resolve: {entry: EntryResolve}, data: { resolveData: 'entry/:id' }},
  {path:'entry/edit/:id', component:EntryFormComponent, resolve: {entry: EntryResolve}, data: { resolveData: 'entry/edit/:id' }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
