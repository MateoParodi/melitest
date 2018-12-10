import { Component, OnInit } from '@angular/core';
import { MeliSearchService } from '../services/meli-search.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private searchService: MeliSearchService) {}

  ngOnInit() {
    this.searchService.categories.next([]);
  }
}
