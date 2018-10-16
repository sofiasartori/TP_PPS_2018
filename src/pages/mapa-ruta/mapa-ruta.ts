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
    const generarPedido = this.navParams.get('generarPedido');
    const home_cliente = this.navParams.get('delegate');
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        try {
          if (generarPedido) {
            home_cliente.distancia = response.routes[0].legs[0].distance.value;
            home_cliente.callService = true;
          }
        } catch (error) {

        }
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  codeLatLng(latLng) {
    var geocoder = new google.maps.Geocoder();
    // var latlng = new google.maps.LatLng(lat, lng);
    let country
    geocoder.geocode({ 'latLng': latLng }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        console.log(results)
        if (results[1]) {
          //formatted address
          // alert(results[0].formatted_address)
          //find country name
          for (var i = 0; i < results[0].address_components.length; i++) {
            for (var b = 0; b < results[0].address_components[i].types.length; b++) {

              //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
              if (results[0].address_components[i].types[b] == "country") {
                //this is the object you are looking for
                country = results[0].address_components[i];
                break;
              }
            }
          }
          // alert(JSON.stringify(country));
          this.navParams.get('delegate').countryCode = country.short_name;
          this.navParams.get('delegate').refresh = true;
          this.navCtrl.pop();
          // return country.short_name;
          //city data
          //alert(city.short_name + " " + city.long_name)


        } else {
          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
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
      } else
        if (this.navParams.get('getCountry')) {
          this.codeLatLng(event.latLng)
        }
    });

  }
}
