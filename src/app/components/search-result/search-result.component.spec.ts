import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchResultComponent} from './search-result.component';
import {MatCardModule, MatChipsModule} from '@angular/material';

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultComponent],
      imports: [MatCardModule, MatChipsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.data = {
      hotelName: 'Hilton',
      location: 'Colombo, Sri Lanka',
      roomType: 'Standard',
      maxAdultsPerRoom: 3,
      numberOfRooms: 2,
      price: 8000.00
    };
  });

  it('should create test result component', () => {
    expect(component).toBeTruthy();
  });
});
