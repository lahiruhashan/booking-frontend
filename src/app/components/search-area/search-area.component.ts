import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatDialogConfig} from '@angular/material';
import {LocationService} from '../../services/location.service';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
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

  filteredLocations: Observable<Location []>;
  private categories: SearchCriteria [] = [];
  private dialogRef: any;
  private locations: Location[];
  private locationControl = new FormControl('', [Validators.required]);
  private dateControl = new FormControl('', [Validators.required]);
  private roomGuestCountControl = new FormControl('', [Validators.required]);
  private nightsNumberControl = new FormControl('', [Validators.required]);
  private searchResults: SearchResult[] = [];
  constructor(private dialog: MatDialog,
              private locationService: LocationService,
              private searchService: SearchService) {
  }

  ngOnInit() {
    this.locationService.getAllLocations().subscribe(locations => {
      this.locations = locations;
      this.filteredLocations = this.locationControl.valueChanges
        .pipe(
          startWith(''),
          map(location => location ? this._filterLocations(location) : this.locations.slice())
        );
    });
  }

  onSubmit(): void {
    if (
      !this.locationControl.invalid &&
      !this.dateControl.invalid &&
      !this.nightsNumberControl.invalid &&
      !this.roomGuestCountControl.invalid
    ) {
      const selectedLocation = this._findSelectedLocationObject(this.locationControl.value);
      const checkInDate = this.dateControl.value;
      const numberOfNights = this.nightsNumberControl.value;
      const searchCriteriaList = this.categories;
      const searchModel = new SearchModel(new Date(checkInDate), numberOfNights, searchCriteriaList, selectedLocation);
      this.searchService.search(searchModel).subscribe(result => {
        this.searchResults = result;
      });
    }
  }

  getRoomGuestErrorMessage() {
    if (this.roomGuestCountControl.hasError('required')) {
      return 'You must enter the room-guest count';
    }
  }

  getDateErrorMessage() {
    if (this.dateControl.hasError('required')) {
      return 'You must select a date';
    }
  }

  getLocationErrorMessage() {
    if (this.locationControl.hasError('required')) {
      return 'You must select a location';
    }
  }

  getNightsNumberErrorMessage() {
    if (this.nightsNumberControl.hasError('required')) {
      return 'You must enter the number of nights';
    }
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
      this.setInputFieldValue(result);
    });
  }

  private setInputFieldValue(result: SearchCriteria []) {
    if (result.length < 1) {
      this.roomGuestCountControl.setValue(null);
    } else {
      let outputString = '';
      result.forEach(res => {
        outputString += (' [Room : ' + res.numberOfRooms).concat(' - Adults : ' + res.numberOfAdults + ']');
      });
      this.roomGuestCountControl.setValue(outputString);
    }
  }

  private _findSelectedLocationObject(value: string): Location {
    const valueLower = value.toLowerCase();

    return this.locations.filter((location: Location) => location.locationName.toLowerCase() === valueLower)[0];
  }

  private _filterLocations(value: string): Location[] {
    const filterValue = value.toLowerCase();

    return this.locations.filter((location: Location) => location.locationName.toLowerCase().indexOf(filterValue) === 0);
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
    this.data.categories.push(new SearchCriteria(0, 0));
  }

}
