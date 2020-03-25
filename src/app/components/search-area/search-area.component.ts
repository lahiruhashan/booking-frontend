import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialogConfig, ThemePalette} from '@angular/material';
import {LocationService} from '../../services/location.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/index';
import {map, startWith} from 'rxjs/internal/operators';
import {Location} from '../../models/Location';
import {SearchService} from '../../services/search.service';
import {SearchModel} from '../../models/SearchModel';
import {SearchCriteria} from '../../models/SearchCriteria';
import {SearchResult} from '../../models/SearchResult';

export interface DialogData {
  categories: SearchCriteria [];
}

@Component({
  selector: 'app-search-area',
  templateUrl: './search-area.component.html',
  styleUrls: ['./search-area.component.css']
})
export class SearchAreaComponent implements OnInit {

  private categories: SearchCriteria [] = [];
  private dialogRef: any;
  private locations: Location[];
  private searchControl = new FormControl();
  private dateControl = new FormControl();
  private nightsNumberControl = new FormControl();
  filteredLocations: Observable<Location []>;
  private searchResults: SearchResult[] = [];


  constructor(
    private dialog: MatDialog,
    private locationService: LocationService,
    private searchService: SearchService) {
  }

  ngOnInit() {
    this.locationService.getAllLocations().subscribe(locations => {
      this.locations = locations;
      this.filteredLocations = this.searchControl.valueChanges
        .pipe(
          startWith(''),
          map(location => location ? this._filterLocations(location) : this.locations.slice())
        );
    });
  }

  onSubmit(): void {
    const selectedLocation = this._findSelectedLocationObject(this.searchControl.value);
    const checkInDate = this.dateControl.value;
    const numberOfNights = this.nightsNumberControl.value;
    const searchCriteriaList = this.categories;
    const searchModel = new SearchModel(new Date(checkInDate), numberOfNights, searchCriteriaList, selectedLocation);
    this.searchService.search(searchModel).subscribe( result => {
      this.searchResults = result;
    });
  }

  private _findSelectedLocationObject(value: string): Location {
    const valueLower = value.toLowerCase();

    return this.locations.filter((location: Location) => location.locationName.toLowerCase() === valueLower)[0];
  }

  private _filterLocations(value: string): Location[] {
    const filterValue = value.toLowerCase();

    return this.locations.filter((location: Location) => location.locationName.toLowerCase().indexOf(filterValue) === 0);
  }

  openDialog(): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      categories: this.categories
    };
    dialogConfig.width = '600px';
    dialogConfig.disableClose = true;

    this.dialogRef = this.dialog.open(RoomGuestDialogComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(result => {
      this.categories = result;
    });
  }
}

@Component({
  selector: 'app-room-guest-dialog',
  templateUrl: 'room-guest-dialog.html',
})

export class RoomGuestDialogComponent {

  constructor(public dialogRef: MatDialogRef<RoomGuestDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  addCategories(): void {
    this.data.categories.push({
      numberOfRooms: 0,
      numberOfAdults: 0
    });
  }

}
