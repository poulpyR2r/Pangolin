import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPangolinComponent } from './list-pangolin/list-pangolin.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { RoleComponent } from './role/role.component';

const routes: Routes = [
  //ajout des routes
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: ListPangolinComponent },
  { path: 'role', component: RoleComponent },
  {path : 'logout', component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
