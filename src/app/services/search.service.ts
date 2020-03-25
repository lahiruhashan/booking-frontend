import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {SearchResult} from '../models/SearchResult';
import {SearchModel} from '../models/SearchModel';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchUrl = 'http://localhost:8080/suntravels-rest/search';

  constructor(private http: HttpClient) { }

  search(searchModel: SearchModel): Observable<SearchResult[]> {
    return this.http.post<SearchModel>(this.searchUrl, searchModel, httpOptions);
  }
}
