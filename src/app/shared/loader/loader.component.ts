import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: 'loader.template.html',
  styleUrls: ['loader.style.scss']
})

export class LoaderComponent implements OnInit {
  show = false;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.loaderSubject.subscribe((state: boolean) => {
      this.show = state;
    });
  }
}
