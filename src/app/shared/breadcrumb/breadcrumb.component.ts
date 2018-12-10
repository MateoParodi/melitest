import { Component, OnInit, OnDestroy } from '@angular/core';
import { MeliSearchService } from 'src/app/services/meli-search.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: 'breadcrumb.component.html',
  styleUrls: ['breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  breadcrumbs = [];
  catSub: Subscription;

  constructor(private searchService: MeliSearchService) { }

  ngOnInit() {
    this.catSub = this.searchService.categories.subscribe((cats) => {
      this.breadcrumbs = cats;
    });
  }

  ngOnDestroy() {
    if (this.catSub) {
      this.catSub.unsubscribe();
    }
  }
}
