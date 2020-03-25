import {SearchCriteria} from './SearchCriteria';
import {Location} from './Location';

export class SearchModel {
  private checkInDate: Date;
  private numberOfNights: number;
  private searchCriteriaList: SearchCriteria [];
  private location: Location;


  constructor(checkInDate: Date, numberOfNights: number, searchCriteriaList: SearchCriteria[], location: Location) {
    this.checkInDate = checkInDate;
    this.numberOfNights = numberOfNights;
    this.searchCriteriaList = searchCriteriaList;
    this.location = location;
  }
}
