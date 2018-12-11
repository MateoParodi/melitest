import { Component, OnInit } from '@angular/core';
import { MeliSearchService } from '../services/meli-search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IItem } from '../services/meli.model';
import { LoaderService } from '../shared/loader/loader.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss']
})
export class ListComponent implements OnInit {
  products: IItem[];
  query: string;
  price: string;
  error = false;

  constructor(private searchService: MeliSearchService,
    private route: ActivatedRoute,
    private router: Router,
    private loader: LoaderService) { }

  /**
   * Subscription to the router params to search every time params change.
   */
  ngOnInit() {
    this.query = this.route.snapshot.params['query'];

    this.route.params.subscribe(params => {
      this.query = params['query'];
      this.search();
    });
  }

  /**
   * Navigate to item information screen when user clicks on a product.
   * @param id String id of the product.
   */
  navigateToProductDetails(id: string) {
    this.router.navigate(['/items', id]);
  }

  /**
   * Calls the service to get the products depending on what the user typed.
   * In case of succes it stops the spinner and shows the product list.
   * In case of failure, it shows an error.
   */
  private search() {
    this.loader.show();
    this.error = false;
    this.searchService.search(this.query).subscribe((response: any) => {
      this.loader.hide();
      this.error = false;
      this.products = response.items;
    }, (error) => {
      this.loader.hide();
      this.error = true;
    });
  }
}
