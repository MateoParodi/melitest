import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin, BehaviorSubject } from 'rxjs';
import { CurrencySigns, ISearch, IItemInformation } from './meli.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';

@Injectable()
export class MeliSearchService {
  itemInfo$: Observable<any>;
  itemDescription$: Observable<any>;
  categories: BehaviorSubject<string[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) { }

  search(query: string): Observable<ISearch> {
    return <Observable<ISearch>>this.http.get(`/api/search/${query}`).do((response: ISearch) => {
      this.categories.next(response.categories);
      return response;
    }, (error) => {
      this.categories.next([]);
      return error;
    });
  }

  getItem(id: string): Observable<IItemInformation> {
    this.itemInfo$ = this.getItemInfo(id);
    this.itemDescription$ = this.getItemDescription(id);
    return forkJoin([this.itemInfo$, this.itemDescription$]).map((response: any): any => {
      response[0].item.description = response[1];

      return response[0];
    })
      .share();
  }

  buildPrice(priceObject: any): string {
    let PRICE = `${CurrencySigns[priceObject.currency]} ${priceObject.amount.toString()}`;

    if (priceObject.decimals) {
      PRICE += `.${priceObject.decimals.toString()}`;
    }

    return PRICE;
  }

  private getItemInfo(id: string) {
    return this.http.get(`/api/item/${id}`);
  }

  private getItemDescription(id: string) {
    return this.http.get(`/api/item/${id}/description`);
  }

}
