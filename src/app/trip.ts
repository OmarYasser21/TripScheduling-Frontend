import {Station} from "./station";

export class Trip {
  id?: any;
  departureTime!: any;
  arrivalTime!: any;
  fromStation!: Station;
  toStation!: Station;
}

