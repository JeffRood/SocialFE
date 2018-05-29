import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/usuarios.models';
import { UserService } from '../../services/user.service';
import { Global } from '../../services/global';
import { FollowService } from '../../services/follow.service';
import { Follow } from '../../models/follow.models';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
 public title: string;
 public user: User;
public url: string;
public token;
public identity;
public total;
public pages;
public page;
public users: User[];
public next_page;
public prev_page;
public follows;
public status: string;


  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userServices: UserService,
    private _followServices: FollowService

  ) {
    this.title = 'Gente';
   this.identity = this._userServices.getIdentity();


   this.token = this._userServices.token;



    this.url = Global.url;

   }

  ngOnInit() {
    console.log( this._userServices.token);
    console.log('Gente han sido cargada');
    this.actualPage();

  }
 actualPage() {
   this.page = 1;
   this._route.params.subscribe(params => {
   let page = +params['page'];
   this.page = page;
   if (! page) {page = 1; } else {
      this.next_page = page + 1;
    this.prev_page = page - 1 ;
    if (this.prev_page <= 0 ) {
      this.prev_page = 1;
    }    }

    // devolver listado
    this.getUsers(page);
   });
 }
getUsers(page) {


  this._userServices.getUsers(page).subscribe( res => {


 if (!res.users) {
  this.status = 'error';
 } else {

this.total = res.total;
this.users = res.users;
this.pages = res.pages;
this.follows = res.users_following;


if (page > this.pages) {


  this._router.navigate(['/gente', 1]);
}


 }

  }, err => {
    let errorMessage = <any>err;
  if (errorMessage != null) {
   this.status = 'error';
 }
});

  }

// tslint:disable-next-line:member-ordering
public followUserOver;

mouseEnter(user_id) {
  this.followUserOver = user_id;
}


mouseLeave(User_id) {
  this.followUserOver = 0;
}

followUser(followed) {

  let follow = new Follow('', this.identity._id, followed);
  this._followServices.addFollow(this.token, follow).subscribe(
    res => {
 if (!res.follow) {
   this.status = 'error';
    } else {
    this.status = 'success';
    this.follows.push(followed);
    }
    }, err => {
      let errorMessage = <any>err;
    if (errorMessage != null) {
     this.status = 'error';
   }
  });
}
unFollowUser(followed) {
  this._followServices.deleteFollow(this.token, followed).subscribe(
    res => {
      let i = this.follows.indexOf(followed);
 if ( i !== -1) {
     this.follows.splice(i, 1);
    }
    }, err => {
      let errorMessage = <any>err;
    if (errorMessage != null) {
     this.status = 'error';
   }
  });
}

}



