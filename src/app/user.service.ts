import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'https://backend-p3.apps.eu410.prod.nextcle.com';

  constructor(private http: HttpClient) { }

  addUser(user: User): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(user);
    console.log(body)
    return this.http.post(this.userUrl+'/signup', user,{'headers':headers});
  }

  login(user: User): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(user);
    console.log(body)
    return this.http.post(this.userUrl+'/login', user,{'headers':headers});
  }
}
