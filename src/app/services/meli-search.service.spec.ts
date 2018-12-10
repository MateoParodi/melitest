import { TestBed, getTestBed } from '@angular/core/testing';
import { MeliSearchService } from './meli-search.service';
import { HttpClientModule } from '@angular/common/http';

describe('MeliSearchService', () => {
  let service: MeliSearchService;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        MeliSearchService
       ]
    });
    injector = getTestBed();
    service = injector.get(MeliSearchService);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

});
