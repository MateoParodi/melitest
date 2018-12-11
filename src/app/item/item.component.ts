import { Component, OnInit, OnDestroy } from '@angular/core';
import { MeliSearchService } from '../services/meli-search.service';
import { ActivatedRoute } from '@angular/router';
import { IItem } from '../services/meli.model';
import { LoaderService } from '../shared/loader/loader.service';
import { Subscription } from 'rxjs';

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
export class ItemComponent implements OnInit, OnDestroy {
  id: string;
  product: IItem;
  error = false;
  sub: Subscription;
  conditionsMap = ConditionsMap;

  constructor(private searchService: MeliSearchService, private route: ActivatedRoute, private loader: LoaderService) { }

  /**
   * Gets the router param [ID] and calls the service to get the information of that item.
   * In case of succes it stops the spinner and shows the information.
   * In case of failure, it shows an error.
   */
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.loader.show();
    this.sub = this.searchService.getItem(this.id).subscribe((response: any) => {
      this.loader.hide();
      this.error = false;
      this.product = response.item;
    }, (error) => {
      this.loader.hide();
      this.error = true;
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
