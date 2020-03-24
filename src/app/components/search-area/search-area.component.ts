import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialogConfig} from '@angular/material';
import {LocationService} from '../../services/location.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/index';
import {map, startWith} from 'rxjs/internal/operators';
import {Location} from '../../models/Location';

export interface DialogData {
  categories: any [];
}

@Component({
  selector: 'app-search-area',
  templateUrl: './search-area.component.html',
  styleUrls: ['./search-area.component.css']
})
export class SearchAreaComponent implements OnInit {

  private categories: any [] = [{
    roomCount: 1,
    adultCount: 1
  }];
  private dialogRef: any;
  private locations: Location[];
  private searchControl = new FormControl();
  filteredLocations: Observable<Location []>;

  constructor(private dialog: MatDialog, private locationService: LocationService) {
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
      roomCount: 0,
      adultCount: 0
    });
  }

}
