import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
      HomeRoutingModule,
      SharedModule,
      CommonModule,
    ],
    declarations: [
        HomeComponent,
    ],
    exports: [
        HomeComponent,
    ]
})
export class HomeModule {

}
