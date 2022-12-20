import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {Trip} from "../../trip";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NgForm, FormControl, Validators, FormGroup} from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { DialogBoxStationsComponent } from '../dialog-box-stations/dialog-box-stations.component';
import {TripService} from "../../trip.service";
import {Station} from "../../station";
import {StationService} from "../../station-service.service";
import {Observable} from "rxjs";
import {DialogBoxTripsComponent} from "../dialog-box-trips/dialog-box-trips.component";

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  trips: Trip[] = [];
  t=new Trip();
  // id!: number;

  displayedColumns: string[] = ['ID','From Station', 'To Station', 'Departure Time', 'Arrival Time', 'Action'];
  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;

  constructor(private tripService: TripService, private _router: Router, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllTrips();
  }

  openDialog1() {
    const dialogRef = this.dialog.open(AddTrip,
      {
        width: '300px',
      });
  }


  openDialog2(action: any, obj: { action: any; }) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxTripsComponent, {
      width: '300px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        // this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  // addRowData(row_obj: { name: any; }){
  //   var d = new Date();
  //   this.trips.push({
  //     id:d.getTime(),
  //     name:row_obj.name
  //   });
  //   this.table.renderRows();
  //
  // }

  updateRowData(row_obj: { id?: any; fromStation: Station; toStation: Station; departureTime: Date; arrivalTime: Date;  }){
    this.trips = this.trips.filter((value,key)=>{
      if(value.id == row_obj.id){
        // value.departureTime = row_obj.departureTime;
        // value.arrivalTime = row_obj.arrivalTime;
        // value.toStation = row_obj.toStation;
        // value.fromStation = row_obj.fromStation;
        row_obj=value;
      }
      return true;
    });
    this.update(row_obj);
  }

  deleteRowData(row_obj: { id: number; }){
    this.trips = this.trips.filter((value,key)=>{
      return value.id != row_obj.id;
    });
    this.delete(row_obj.id);
  }

  // openDialog3() {
  //   const dialogRef = this.dialog.open(UpdateStation,
  //     {
  //       width: '450px',
  //     });
  // }

  getAllTrips() {
    this.tripService.getTrips().subscribe((data: Trip[]) => {
      console.log(data);
      this.trips = data;
    });
  }

  delete(id:number) {
    this.tripService.deleteTrip(id).subscribe((data: any) => {
      console.log(data);
      // this.dialogRef.close()
      this._router.navigate(['/trips']); });
    // window.location.reload();
  }

  update(trip: Trip) {
    this.tripService.updateTrip(trip.id,trip).subscribe((data: any) => {
      console.log(data);
      // this.dialogRef.close()
      this._router.navigate(['/trips']); });
    //window.location.reload();
  }

}

@Component({
  selector: 'add-trip',
  templateUrl: './add-trip.html',
  styleUrls: ['./trips.component.css']
})
export class AddTrip implements OnInit{

  stations: Station[] = [];
  tr: Trip={
    departureTime:'',
    arrivalTime:'',
    fromStation: {id:'',name:''},
    toStation:   {id:'',name:''}
  }
  t: Trip = new Trip();
  exform!: FormGroup;


  constructor(public dialogRef: MatDialogRef<AddTrip>,private tripService: TripService,private stationService: StationService, private _router: Router) {
  }

  getAllStations() {
    this.stationService.getStations().subscribe((data: Station[]) => {
      console.log(data);
      this.stations = data;
    });
  }

  //Dialog close function
  onNoClick(): void {
    this.dialogRef.close();
  }
  addTrip(trip: Trip) {
    this.tripService.addTrip(trip).subscribe((data: any) => {
      console.log(data);
      this.dialogRef.close()
      this._router.navigate(['/trips']); });
    //window.location.reload();
  }

  /*Form validations*/

  ngOnInit(): void {
    this.getAllStations();
    this.exform = new FormGroup({
      'From' : new FormControl(null, Validators.required),
      'To' : new FormControl(null, Validators.required),
      'Departure' : new FormControl(null, Validators.required),
      'Arrival' : new FormControl(null, Validators.required),

    });
  }

}


