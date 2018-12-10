import { TestBed, async, ComponentFixture, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BreadcrumbComponent } from './breadcrumb.component';
import { MeliSearchService } from 'src/app/services/meli-search.service';

const searchServiceMock = {
  categories: new BehaviorSubject([]),
  search() {
    return;
  }
};

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;
  let service: MeliSearchService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        BreadcrumbComponent
      ],
      providers: [
        { provide: MeliSearchService, useValue: searchServiceMock },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    service = getTestBed().get(MeliSearchService);
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set the breadcrumbs when subject changes', () => {
    fixture.detectChanges();

    service.categories.next(['test', 'mock']);

    expect(component.breadcrumbs).toEqual(['test', 'mock']);
  });

});
