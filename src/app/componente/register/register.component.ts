import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/usuarios.models';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public title: string;
  public user: User ;
  public status: string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
   this.title = 'Registrate';
   this.user = new User (
     '',
     '',
     '',
     '',
     '',
     'ROLE_USER',
     '',
     ''  );
   }

  ngOnInit() {
    console.log('Componente de login Cargando');
  }

  OnSubmit(form) {
let user = this.user;
  this._userService.register(user).subscribe(
    response => {
       if (response.user && response.user._id) {
          console.log(response.user);
      this.status = 'success';
      form.reset();
       } else {
         this.status = 'error';
       }
    },
    Error => {
   console.log(<any>Error);

    }

  );

}
}
