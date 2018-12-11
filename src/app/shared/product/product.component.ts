import { Component, Input } from '@angular/core';
import { IItem } from 'src/app/services/meli.model';
import { MeliSearchService } from 'src/app/services/meli-search.service';

@Component({
  selector: 'app-product',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.scss']
})
export class ProductComponent {
  @Input() productData: IItem;

  constructor(public searchService: MeliSearchService) { }

}
