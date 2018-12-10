import { TestBed, async, ComponentFixture, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../shared/shared.module';
import { MeliSearchService } from '../services/meli-search.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LoaderService } from '../shared/loader/loader.service';
import { ListComponent } from './list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

const searchServiceMock = {
  categories: new BehaviorSubject([]),
  search() {
    return of({});
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

const mockActivatedRoute = {
  params: of([{ 'query': 'test' }]),
  snapshot: {
    params: {
      query: 'test'
    }
  }
};


describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let service: MeliSearchService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      declarations: [
        ListComponent
      ],
      providers: [
        { provide: MeliSearchService, useValue: searchServiceMock },
        { provide: LoaderService, useValue: loaderServiceMock },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    service = getTestBed().get(MeliSearchService);
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call search if route params change', () => {
    spyOn(service, 'search').and.returnValue(of({
      author: {
        name: 'Mateo',
        lastname: 'Parodi',
      },
      categories: ['asd', 'test', 'mock'],
      items: [{
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
      }]
    }));
    fixture.detectChanges();
    expect(component.products).toEqual([{
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
      }]
    );
  });

  it('should navigate to a product', () => {
    spyOn(component, 'navigateToProductDetails').and.callThrough();
    fixture.detectChanges();

    component.navigateToProductDetails({
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
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/items', '123']);
  });

});
