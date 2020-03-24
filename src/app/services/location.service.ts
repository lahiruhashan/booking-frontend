import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {Location} from '../models/Location';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  locationsUrl = 'http://localhost:8080/api/locations';

  constructor(private http: HttpClient) { }

  getAllLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.locationsUrl);
  }
}
