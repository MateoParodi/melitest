import { TestBed, async, ComponentFixture, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductComponent } from './product.component';
import { MeliSearchService } from 'src/app/services/meli-search.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const searchServiceMock = {
  categories: new BehaviorSubject([]),
  search() {
    return;
  }
};

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        ProductComponent
      ],
      providers: [
        { provide: MeliSearchService, useValue: searchServiceMock },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

});
