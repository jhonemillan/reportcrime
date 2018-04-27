import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { AgmCoreModule } from '@agm/core';
import { key } from './apiconfig';

const appRoutes: Routes = [
    { path: '',   component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'map', component: MapComponent},
    { path: '**', redirectTo: '' }
  ];

  @NgModule({
    declarations: [
    LoginComponent,
    MapComponent],
    imports: [
      RouterModule.forRoot(
        appRoutes
      ),
      AgmCoreModule.forRoot({
        apiKey: key
      })],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }
