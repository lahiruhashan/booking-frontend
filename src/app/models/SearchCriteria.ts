export class SearchCriteria {
  numberOfRooms: number;
  numberOfAdults: number;

  constructor(numberOfRooms: number, numberOfAdults: number) {
    this.numberOfRooms = numberOfRooms;
    this.numberOfAdults = numberOfAdults;
  }
}
