import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

import { APP_ROUTES } from './app.routing';



//  Componentes
import { LoginComponent } from './componente/login/login.component';
import { RegisterComponent } from './componente/register/register.component';
import { HomeComponent } from './componente/home/home.component';
import { UserEditComponent } from './componente/user-edit/user-edit.component';
import { UserComponent } from './componente/user/user.component';
import { UserService } from './services/user.service';
import { FollowService } from './services/follow.service';
import { SidebarComponent } from './componente/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent,
    UserComponent,
    SidebarComponent,

  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    FollowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
