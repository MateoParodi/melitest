import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LoaderService } from './shared/loader/loader.service';
import { MeliSearchService } from './services/meli-search.service';

const searchServiceMock = {
  search() {
    return;
  }
};
const loaderServiceMock = {
  show() {
    return;
  }
};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: MeliSearchService, useValue: searchServiceMock},
        {provide: LoaderService, useValue: loaderServiceMock},
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
