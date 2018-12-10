import { Component, OnInit } from '@angular/core';
import { MeliSearchService } from '../services/meli-search.service';
import { ActivatedRoute } from '@angular/router';
import { IItem } from '../services/meli.model';
import { LoaderService } from '../shared/loader/loader.service';

export enum ConditionsMap {
  used = 'Usado',
  new = 'Nuevo',
  refurbished = 'Refurbished',
}

@Component({
  selector: 'app-item',
  templateUrl: 'item.component.html',
  styleUrls: ['item.component.scss']
})
export class ItemComponent implements OnInit {
  id: string;
  product: IItem;
  error = false;
  conditionsMap = ConditionsMap;

  constructor(private searchService: MeliSearchService, private route: ActivatedRoute, private loader: LoaderService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.loader.show();
    this.searchService.getItem(this.id).subscribe((response: any) => {
      this.loader.hide();
      this.error = false;
      this.product = response.item;
    }, (error) => {
      this.loader.hide();
      this.error = true;
    });
  }
}
