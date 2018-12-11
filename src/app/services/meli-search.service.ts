import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin, BehaviorSubject } from 'rxjs';
import { CurrencySigns, ISearch, IItemInformation, IPrice } from './meli.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';

@Injectable()
export class MeliSearchService {
  itemInfo$: Observable<any>;
  itemDescription$: Observable<any>;
  categories: BehaviorSubject<string[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) { }

  /**
   * Fetch the current search from the server.
   * In case of success it fills the categories subject with the breadcrumbs.
   * In case of error, empties the categories subject, and return observable with the error received.
   * @param query Typed string from the user.
   * @return Observable with the fetched search items.
   */
  search(query: string): Observable<ISearch> {
    return <Observable<ISearch>>this.http.get(`/api/search/${query}`).do((response: ISearch) => {
      this.categories.next(response.categories);
      return response;
    }, (error) => {
      this.categories.next([]);
      return error;
    });
  }

  /**
   * Fetch the a single item from the server.
   * Joins the two private requests, the first one is the hole item information, and the second one is
   * the item description, when both request finish, it return only one response with boths merged.
   * @param id String ID of the current item.
   * @return Observable with the merged item data.
   */
  getItem(id: string): Observable<IItemInformation> {
    this.itemInfo$ = this.getItemInfo(id);
    this.itemDescription$ = this.getItemDescription(id);
    return forkJoin([this.itemInfo$, this.itemDescription$]).map((response: any): any => {
      response[0].item.description = response[1];

      return response[0];
    })
      .share();
  }

  /**
   * Creates a price string checking the decimals and the currency.
   * @param priceObject Object with the price information.
   * @return String with the price to display in the app.
   */
  buildPrice(priceObject: IPrice): string {
    let PRICE = `${CurrencySigns[priceObject.currency]} ${priceObject.amount.toString()}`;

    if (priceObject.decimals) {
      PRICE += `.${priceObject.decimals.toString()}`;
    }

    return PRICE;
  }

  /**
   * Fetchs the item information from server.
   * @param id String of a single item.
   * @return Observable with the request.
   */
  private getItemInfo(id: string): Observable<Object> {
    return this.http.get(`/api/item/${id}`);
  }

  /**
   * Fetchs the item description from server.
   * @param id String of a single item.
   * @return Observable with the request.
   */
  private getItemDescription(id: string): Observable<Object> {
    return this.http.get(`/api/item/${id}/description`);
  }

}
