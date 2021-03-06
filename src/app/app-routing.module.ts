import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', pathMatch: 'full',
    loadChildren: './home/home.module#HomeModule',
  },
  {
    path: 'items/search/:query',
    loadChildren: './list/list.module#ListModule'
  },
  {
    path: 'items/:id',
    loadChildren: './item/item.module#ItemModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
