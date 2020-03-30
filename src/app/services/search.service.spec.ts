import {TestBed} from '@angular/core/testing';

import {SearchService} from './search.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('SearchService', () => {
  let service: SearchService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:8080/suntravels-rest';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchService],
        imports: [HttpClientModule, HttpClientTestingModule]
    });

    service = TestBed.get(SearchService);
    httpMock = TestBed.get(HttpTestingController);
  });


  it('should return search results', () => {
    const searchResponse = [
        {
          hotelName: 'Hilton',
          location: 'Colombo, Sri Lanka',
          roomType: 'Standard',
          maxAdultsPerRoom: 3,
          numberOfRooms: 2,
          price: 8000.00
        },
        {
          hotelName: 'Galadari',
          location: 'Colombo, Sri Lanka',
          roomType: 'Standard',
          maxAdultsPerRoom: 2,
          numberOfRooms: 2,
          price: 9500.00
        }
    ];

    const searchUrl = baseUrl + '/search';

    const searchModel = {
      checkInDate: new Date('2020-03-16'),
      numberOfNights: 2,
      searchCriteriaList: [
        {
          numberOfRooms: 1,
          numberOfAdults: 2,
        }],
      location: {
        locationId: 1,
        locationName: 'Colombo, Sri Lanka'
      }
    };

    service.search(searchModel).subscribe(res => {
      expect(res).toEqual(searchResponse);
    });


    const requestMock = httpMock.expectOne(searchUrl);
    expect(requestMock.request.method).toBe('POST');
    requestMock.flush(searchResponse);
  });

});
