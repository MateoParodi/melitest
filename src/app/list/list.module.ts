// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { ListComponent } from './list.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ListRoutingModule } from './list-routing.module';

@NgModule({
  imports: [
    ListRoutingModule,
    SharedModule,
    CommonModule,
  ],
  declarations: [
    ListComponent,
  ],
  exports: [
    ListComponent,
  ]
})
export class ListModule {

}
