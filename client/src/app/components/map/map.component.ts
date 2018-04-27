import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  title = 'Add point';
  lat = 0;
  lng = 0;

  constructor() { }

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

  AddPoint($event) {
    console.log($event.coords);
  }

}
