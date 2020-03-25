export class SearchCriteria {
  private numberOfRooms: number;
  private numberOfAdults: number;

  constructor(numberOfRooms: number, numberOfAdults: number) {
    this.numberOfRooms = numberOfRooms;
    this.numberOfAdults = numberOfAdults;
  }
}
