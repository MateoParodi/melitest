// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { ItemComponent } from './item.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ItemRoutingModule } from './item-routing.module';

@NgModule({
    imports: [
      ItemRoutingModule,
      SharedModule,
      CommonModule
    ],
    declarations: [
        ItemComponent,
    ],
    exports: [
        ItemComponent,
    ]
})
export class ItemModule {

}
