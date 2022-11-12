//dialog-box-stations.component.ts
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Station} from "../../station";

// export interface UsersData {
//   name: string;
//   id: number;
// }



@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box-stations.component.html',
  styleUrls: ['./dialog-box-stations.component.css']
})
export class DialogBoxStationsComponent {
// station:Station={
//     id: '',
//     name: ''
// }
  action:string;
  local_data:any;
  // stations: Station[] = [];
  // s=new Station();


  constructor(
    public dialogRef: MatDialogRef<DialogBoxStationsComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Station) {
    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
