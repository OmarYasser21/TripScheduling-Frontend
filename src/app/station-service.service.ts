import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Station } from './station';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  private stationUrl = 'https://backendd-p3.apps.eu410.prod.nextcle.com';

  constructor(private http: HttpClient) { }

  getStations(): Observable<Station[]> {
    return this.http.get<Station[]>(this.stationUrl);
  }
  addStation(station: Station): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(station);
    console.log(body)
    return this.http.post(this.stationUrl+'/create', station,{'headers':headers});
  }
  deleteStation(id: number): Observable<any> {
    return this.http.delete(this.stationUrl + '/delete/' + id);
  }

  updateStation(id: number, station: Station): Observable<any> {
    return this.http.put(this.stationUrl + '/update/' + id, station);
  }

  getById(id: number): Observable<any> {
    return this.http.get(this.stationUrl + '/get/' + id);
  }
}
