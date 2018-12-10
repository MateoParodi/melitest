import { TestBed, async, ComponentFixture, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoaderComponent } from './loader.component';
import { LoaderService } from './loader.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const loaderServiceMock = {
  loaderSubject: new BehaviorSubject<boolean>(false),
  show() {
    this.loaderSubject.next(true);
  },
  hide() {
    this.loaderSubject.next(false);
  }
};

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let service: LoaderService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        LoaderComponent
      ],
      providers: [
        { provide: LoaderService, useValue: loaderServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    service = getTestBed().get(LoaderService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the state into the show variable', () => {
    spyOn(service, 'show').and.callFake(() => {
      service.loaderSubject.next(true);
    });

    fixture.detectChanges();

    service.show();

    expect(component.show).toBeTruthy();

  });

});
