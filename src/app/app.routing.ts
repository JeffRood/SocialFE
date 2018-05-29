import {Routes , RouterModule} from '@angular/router';
import { LoginComponent } from './componente/login/login.component';
import { RegisterComponent } from './componente/register/register.component';
import { HomeComponent } from './componente/home/home.component';
import { UserEditComponent } from './componente/user-edit/user-edit.component';
import { UserComponent } from './componente/user/user.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'datos', component: UserEditComponent},
  {path: 'gente', component: UserComponent},
  {path: 'gente/:page', component: UserComponent},
  {path: '**', component: HomeComponent},


];

export const APP_ROUTES =  RouterModule.forRoot(appRoutes, { useHash: true});
