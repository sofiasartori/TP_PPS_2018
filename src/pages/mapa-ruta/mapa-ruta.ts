import { Component } from '@angular/core'; import { StringsL } from '../../providers/Strings';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the MapaRutaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

declare var google;
@IonicPage()
@Component({
  selector: 'page-mapa-ruta',
  templateUrl: 'mapa-ruta.html',
})
export class MapaRutaPage {
  map: any;
  start: string = "Somellera 409";
  end: string = "Gorriti 11";
  directionsService: any;
  directionsDisplay: any;
  returnPosition = false;

  constructor(private stringsL: StringsL, public navCtrl: NavController,
    public platform: Platform,
    public navParams: NavParams,
    private geolocation: Geolocation) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaRutaPage');

  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter MapaRutaPage');
    this.returnPosition = this.navParams.get('returnPosition')
    this.start = this.navParams.get('start');
    this.end = this.navParams.get('end');
    if (!this.platform.is('mobileweb')) {
      this.getPosition();
    } else {
      this.loadMap(null);
    }
  }
  getPosition(): any {
    this.geolocation.getCurrentPosition({ timeout: 10000 }).then(response => {
      // alert(response.coords.longitude)
      this.loadMap(response);
    })
      .catch(error => {
        alert(error);
        console.log(error);
      })


  }
  loadMap(position: any) {
    if (position == null) {
      position = {
        coords: {
          latitude: -34.7671238,
          longitude: - 58.4089714

        }
      }
    }
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude, longitude);

    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');

    // create LatLng object
    let myLatLng = { lat: latitude, lng: longitude };

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
    this.getAddress();
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      // let marker = new google.maps.Marker({
      //   position: myLatLng,
      //   map: this.map,
      //   title: 'Hello World!'
      // });
      mapEle.classList.add('show-map');
      this.directionsService = new google.maps.DirectionsService();
      this.directionsDisplay = new google.maps.DirectionsRenderer();
      this.directionsDisplay.setMap(this.map);
      this.calculateAndDisplayRoute();
    });
  }
  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  getAddress() {
    var geocoder = new google.maps.Geocoder();

    google.maps.event.addListener(this.map, 'click', (event) => {
      if (this.returnPosition) {
        geocoder.geocode({
          'latLng': event.latLng
        }, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              this.navParams.get('delegate').destino = results[0].formatted_address
              this.navCtrl.pop();
              // alert(results[0].formatted_address);
            }
          }
        });
      }
    });

  }
}
