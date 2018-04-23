import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule, MatSidenav} from '@angular/material/sidenav';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
import {MatListModule} from '@angular/material/list';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  lat = 0;
  lng = 0;
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  opened;

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.findMe();
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}
