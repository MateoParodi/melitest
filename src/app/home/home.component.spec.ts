import { TestBed, async, ComponentFixture, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { MeliSearchService } from '../services/meli-search.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const searchServiceMock = {
  categories: new BehaviorSubject([]),
  search() {
    return;
  }
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: MeliSearchService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      declarations: [
        HomeComponent
      ],
      providers: [
        { provide: MeliSearchService, useValue: searchServiceMock },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    service = getTestBed().get(MeliSearchService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call categories subject with an empty array', () => {
    spyOn(service.categories, 'next');

    fixture.detectChanges();

    expect(service.categories.next).toHaveBeenCalledWith([]);
  });
});
