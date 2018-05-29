import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Global } from '../../services/global';
import { FollowService } from '../../services/follow.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  providers: [UserService, FollowService]
})
export class SidebarComponent implements OnInit {
public url;
public identity;
public token;
public stats;
public status;

  constructor(private _userServices: UserService) {
    this.url = Global.url;
    this.identity = this._userServices.getIdentity();
    this.token = this._userServices.getToken();
      this.stats = this._userServices.getStats();
      console.log(' este es mi nombre ' + this.identity.surname);

   }

  ngOnInit() {
    console.log('Componente Sidebar ha Cargado');

  }

}
