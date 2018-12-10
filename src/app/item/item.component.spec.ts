import { TestBed, async, ComponentFixture, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../shared/shared.module';
import { MeliSearchService } from '../services/meli-search.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ItemComponent } from './item.component';
import { LoaderService } from '../shared/loader/loader.service';
import { of } from 'rxjs';

const searchServiceMock = {
  categories: new BehaviorSubject([]),
  search() {
    return;
  },
  getItem(param: string) {
    return of([
      { mock: 'test' }
    ]);
  },
  buildPrice(param: any) {
    return '$ 100';
  }
};

const loaderServiceMock = {
  show() {
    return;
  },
  hide() {
    return;
  }
};

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let service: MeliSearchService;
  let loaderService: LoaderService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      declarations: [
        ItemComponent
      ],
      providers: [
        { provide: MeliSearchService, useValue: searchServiceMock },
        { provide: LoaderService, useValue: loaderServiceMock },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    service = getTestBed().get(MeliSearchService);
    loaderService = getTestBed().get(LoaderService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show loader when initializes', () => {
    spyOn(loaderService, 'show');

    fixture.detectChanges();

    expect(loaderService.show).toHaveBeenCalled();
  });

  it('should hide loader when request finish', () => {
    spyOn(loaderService, 'show');
    spyOn(loaderService, 'hide');
    spyOn(service, 'getItem').and.returnValue(of({
      item: {
        id: '123',
        title: 'Ipod',
        price: {
          currency: 'ARS',
          amount: 100,
          decimals: null,
        },
        picture: 'test',
        condition: 'new',
        free_shipping: false,
        sold_quantity: 2
      }
    }));

    fixture.detectChanges();

    expect(loaderService.show).toHaveBeenCalled();
    expect(loaderService.hide).toHaveBeenCalled();
    expect(component.product).toEqual({
      id: '123',
      title: 'Ipod',
      price: {
        currency: 'ARS',
        amount: 100,
        decimals: null,
      },
      picture: 'test',
      condition: 'new',
      free_shipping: false,
      sold_quantity: 2
    });
  });

});
