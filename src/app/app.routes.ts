import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { GetUserInfoComponent } from './get-user-info/get-user-info.component';
import { IndexComponent } from './index/index.component';

export const routes: Routes = [
  {path: "", component : IndexComponent},
  {path: "login", component : LoginComponent},
  {path: "create/account", component : CreateAccountComponent},
  {path: "user", component : GetUserInfoComponent},
];
