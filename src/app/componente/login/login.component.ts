import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/usuarios.models';

import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public title: string;
  public user: User;
  public status: string;
  public identity;
  public token;
  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _userService: UserService) {
    this.title = 'LOG IN';
    this.user = new User('', '', '', '', '', 'USER_ROLE', '', '' );
  }

  ngOnInit() {
  }

  onSubmit() {
    // Loguear al usuario y conseguir sus datos
    this._userService.login(this.user).subscribe(res => {
      this.identity = res.user;
      if (!this.identity || !this.identity._id) {
        this.status = 'error';
      } else {
        // Guardar datos del usuario logueado en el LocalStorage
        localStorage.setItem('identity', JSON.stringify(this.identity));
        // Conseguir token
        this.getToken();
      }
    }, err => {
      let errorMessage = <any>err;
      console.log(errorMessage);
      if (errorMessage != null) {
        this.status = 'error';
      }
    });
  }


  getToken() {
    this._userService.login(this.user, 'true').subscribe(res => {
      this.token = res.token;
      console.log(this.token);
      if (this.token.length <= 0 ) {
        this.status = 'error';
      } else {
        // guardar el token del usuario logueado en el  LocalStorage
        localStorage.setItem('token', this.token);
        // Conseguir los contadores

        this.getCounters();
      }
    }, err => {
      let errorMessage = <any>err;
      console.log(errorMessage);
      if (errorMessage != null) {
        this.status = 'error';
      }
    });
  }

  getCounters() {
    this._userService.getCounters().subscribe(
      res => {
      localStorage.setItem('stats', JSON.stringify(res));
      this.status = 'success';
      this._router.navigate(['/']);
    }, err => {
      console.log(<any>err);
    });
  }

}
