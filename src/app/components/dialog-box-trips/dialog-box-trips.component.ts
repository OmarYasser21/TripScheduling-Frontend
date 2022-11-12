//dialog-box-stations.component.ts
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Station} from "../../station";
import {Trip} from "../../trip";
import {StationService} from "../../station-service.service";



@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box-trips.component.html',
  styleUrls: ['./dialog-box-trips.component.css']
})
export class DialogBoxTripsComponent {
  // station:Station={
  //   id: '',
  //   name: ''
  // }
  action:string;
  local_data:any;
  stations: Station[] = [];
  t:Trip={
    id: '',
    fromStation: {id: '', name: ''},
    toStation: {id: '', name: ''},
    departureTime: '',
    arrivalTime: ''
  }
  // s=new Station();


  constructor(
    private stationService: StationService,
    public dialogRef: MatDialogRef<DialogBoxTripsComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Trip) {
    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;

  }
  ngOnInit(): void {
    this.getAllStations();
  }

  getAllStations(){
    this.stationService.getStations().subscribe(data => {
      this.stations = data;
    });
  }

  doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
