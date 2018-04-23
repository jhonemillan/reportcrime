import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';


const appRoutes: Routes = [
    { path: '',   component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: '**', redirectTo: '' }
  ];

  @NgModule({
    declarations: [
    LoginComponent],
    imports: [
      RouterModule.forRoot(
        appRoutes
      )],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }
