import { Component, OnInit, DoCheck } from '@angular/core';
import { Global } from './services/global';
import { User } from './models/usuarios.models';

import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  public title: string;
  public identity;
  public url;

  public user: User;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userServices: UserService
  ) {
this.title = 'Plustalk';
this.url = Global.url;
  }
  ngOnInit() {
     this._userServices.getToken();
    this.identity = this._userServices.getIdentity();
    console.log(this.identity);

  }
  ngDoCheck() {
 this.identity = this._userServices.getIdentity();
  }
  logout() {

       localStorage.clear();
       this.identity = null;
       this._router.navigate(['/login']);
  }
}
