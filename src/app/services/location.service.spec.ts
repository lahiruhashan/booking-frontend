import {TestBed} from '@angular/core/testing';

import {LocationService} from './location.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('LocationService', () => {
  let locationService: LocationService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:8080/suntravels-rest';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationService],
      imports: [HttpClientModule, HttpClientTestingModule]
    });
    locationService = TestBed.get(LocationService);
    httpMock = TestBed.get(HttpTestingController);
  });

  const locationResponse = [
    {
      locationId: 1,
      locationName: 'Colombo, Sri Lanka'
    },
    {
      locationId: 2,
      locationName: 'Galle, Sri Lanka'
    }
  ];

  it('should get all locations', () => {
    const locationUrl = baseUrl + '/location/all';

    locationService.getAllLocations().subscribe(res => {
      expect(res).toEqual(locationResponse);
    });

    const requestMock = httpMock.expectOne(locationUrl);
    expect(requestMock.request.method).toBe('GET');
    requestMock.flush(locationResponse);
  });

  afterEach(() => {
    httpMock.verify();
  });

});
