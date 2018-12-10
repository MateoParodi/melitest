import { TestBed, getTestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        LoaderService
       ]
    });
    injector = getTestBed();
    service = injector.get(LoaderService);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should call .next with true', () => {
    spyOn(service.loaderSubject, 'next');

    service.show();

    expect(service.loaderSubject.next).toHaveBeenCalledWith(true);
  });

  it('should call .next with false', () => {
    spyOn(service.loaderSubject, 'next');

    service.hide();

    expect(service.loaderSubject.next).toHaveBeenCalledWith(false);
  });

});
