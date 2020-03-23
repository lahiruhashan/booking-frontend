import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialogConfig} from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-search-area',
  templateUrl: './search-area.component.html',
  styleUrls: ['./search-area.component.css']
})
export class SearchAreaComponent implements OnInit {

  animal: string;
  name: string;
  private dialogRef: any;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openDialog(): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      name: this.name,
      animal: this.animal
    };
    dialogConfig.width = '400px';

    this.dialogRef = this.dialog.open(RoomGuestDialogComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
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

  onNoClick(): void {
    this.dialogRef.close();
  }

}
