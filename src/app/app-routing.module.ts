import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchAreaComponent} from './components/search-area/search-area.component';

const routes: Routes = [
  {path: '', component: SearchAreaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
