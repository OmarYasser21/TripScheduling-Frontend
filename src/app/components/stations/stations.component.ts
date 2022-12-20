import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {Station} from "../../station";
import {StationService} from "../../station-service.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NgForm, FormControl, Validators, FormGroup} from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { DialogBoxStationsComponent } from '../dialog-box-stations/dialog-box-stations.component';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {

  stations: Station[] = [];
  s=new Station();
   // id!: number;

  displayedColumns: string[] = ['ID','Station Name', 'Action'];
  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;

  constructor(private stationService: StationService, private _router: Router, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllStations();

  }

  openDialog1() {
    const dialogRef = this.dialog.open(AddStation,
      {
        width: '300px',
      });
  }


  openDialog2(action: any, obj: { action: any; }) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxStationsComponent, {
      width: '300px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        console.log("res"+result.data.id);
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: { name: any; id:number }){
    this.stations.push({
      id:row_obj.id,
      name:row_obj.name
    });
    this.table.renderRows();

  }
  updateRowData(row_obj: { id?: number; name: string; }){
    this.stations = this.stations.filter((value,key)=>{
      if(value.id == row_obj.id){
        row_obj=value;
      }
      return true;
    });
    this.update(row_obj);
  }

  deleteRowData(row_obj: { id: number; }){
    this.stations = this.stations.filter((value,key)=>{
      return value.id != row_obj.id;
    });
    this.delete(row_obj.id);
  }


  delete(id:number) {
    this.stationService.deleteStation(id).subscribe((data: any) => {
      console.log(data);
      // this.dialogRef.close()
      this._router.navigate(['/stations']); });
    // window.location.reload();
  }

  getAllStations(){
    this.stationService.getStations().subscribe((data: Station[]) => {
      console.log(data);
      this.stations = data;
    });
  }

  update(s1:Station) {
    this.stationService.updateStation(s1.id,s1).subscribe((data: any) => {
      console.log(data);
      this.getAllStations();
      // this.dialogRef.close()
      this._router.navigate(['/stations']); });
    // window.location.reload();
  }

}


///////////////////////////////

@Component({
  selector: 'add-station',
  templateUrl: './add-station.html',
  styleUrls: ['./stations.component.css']
})
export class AddStation implements OnInit{

  s=new Station();
  exform!: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddStation>,private stationService: StationService, private _router: Router) {
  }

  //Dialog close function
  onNoClick(): void {
    this.dialogRef.close();
  }
  addStation() {
    this.stationService.addStation(this.s).subscribe((data: any) => {
      console.log(data);
      this.dialogRef.close()
      this._router.navigate(['/stations']); });
  }

  /*Form validations*/

  ngOnInit(): void {
    this.exform = new FormGroup({
      'name' : new FormControl(null, Validators.required),
    });
  }

}



