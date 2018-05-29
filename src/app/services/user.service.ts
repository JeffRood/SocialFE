// tslint:disable:eofline
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './../models/usuarios.models';
import {Global} from './global';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';


@Injectable()
export class UserService {
    public url: string;
   public identity;
    public token;
    public stats;

    constructor(public _http: HttpClient) {
        this.url = Global.url;
    }

    register(user: User): Observable<any> {
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'register', params, {headers: headers});
    }

    login(user, gettoken = null): Observable<any> {
        if (gettoken != null) {
            user.gettoken = gettoken;
        }
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'login', params, {headers: headers});
    }


    getIdentity() {
      let identity: any = JSON.parse(localStorage.getItem('identity'));

      if ( identity !== undefined) {
            this.identity = identity;

          return  this.identity;
      } else {

          return null;
      }

  }

    getToken() {
        let token = localStorage.getItem('token');
  // tslint:disable-next-line:no-debugger
//  debugger;
this.token = token;
        // if (this.token === undefined) {
        //     this.token = token;
        // } else {
        //  // this.token = null;
        // }

    }

    getStats() {
        let stats = JSON.parse(localStorage.getItem('stats'));
        if (stats !== 'undefined') {
            this.stats = stats;
        } else {
            this.stats = null;
        }
        return this.stats;
    }

    getCounters(userId = null): Observable<any> {
      this.getToken();
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization',  this.token);
        if (userId !=  null) {
            return this._http.get(this.url + 'counters/' + userId, {headers: headers});
        } else {
            return this._http.get(this.url + 'counters', {headers: headers});
        }

    }

    updateUser(user: User): Observable<any> {
        let params = JSON.stringify(user);
        this.getToken();
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
        return this._http.put(this.url + 'update-user/' + user._id, params, {headers: headers});
    }

    getUsers(page): Observable<any> {
      this.getToken();
      let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);

  return this._http.get(this.url + 'users/' + page , {headers: headers});
    }


}
