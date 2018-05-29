import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/usuarios.models';
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';




@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  providers: [UserService, UploadService]
})
export class UserEditComponent implements OnInit {
 public title: string;
 public user: User;
 public identity;
 public token;
 public status: string;
public url;


  constructor(
    public _router: Router,
    public _route: ActivatedRoute,
    public _userServices: UserService,
    public _uploadServices: UploadService,

  ) {
    this.title = 'Actualizar mis datos';
    this.user = _userServices.getIdentity();
    this.identity = this.user;
   this.token = _userServices.getToken();
   this.url = Global.url;


   }

  ngOnInit() {
    console.log(this.user);

    console.log( 'User-Edit esta cargado');

    }
    OnSubmit() {
this._userServices.updateUser(this.user).subscribe(res => {
if (!res.user ) {
  this.status = 'error';
} else {
  this.status = 'success';
  localStorage.setItem('identity', JSON.stringify(this.user));
  this.identity = this.user;
  // subida de imagen de usuario
  this._uploadServices.makefilerequest(this.url + 'upload-image-user/' + this.user._id, [] , this.filesUpload , this.token , 'image')
  .then( (result: any) => {
    console.log(result);
this.user.image = result.user.image;
localStorage.setItem('identity', JSON.stringify(this.user));
  });
}
}, err => {
  let errorMessage = <any>err;
 console.log(errorMessage);
 if (errorMessage != null) {
   this.status = 'error';
 }
});
    }
// evento change
// tslint:disable-next-line:member-ordering
public filesUpload: Array<File>;
fileChangeEvent( fileInput) {
this.filesUpload = <Array<File>>fileInput.target.files;


}
}
