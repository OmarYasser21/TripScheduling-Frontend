import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from './trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private tripUrl = 'https://backenddd-p3.apps.eu410.prod.nextcle.com/trips';

  constructor(private http: HttpClient) { }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripUrl);
  }
  addTrip(trip: Trip): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(trip);
    console.log(body)
    return this.http.post(this.tripUrl+'/create', trip,{'headers':headers});
  }
  deleteTrip(id: number): Observable<any> {
    return this.http.delete(this.tripUrl + '/delete/' + id);
  }

  updateTrip(id: number, trip: Trip): Observable<any> {
    return this.http.put(this.tripUrl + '/update/' + id, trip);
  }

  getById(id: number): Observable<any> {
    return this.http.get(this.tripUrl + '/get/' + id);
  }
}
