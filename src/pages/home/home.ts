import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { Utils } from '../../lib/Utils';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  destino = 'Gorriti 11 Lomas de zamora';
  hora = null;
  
  constructor(public navCtrl: NavController,
    private datePicker: DatePicker) {

  }
  getHora() {
    this.datePicker.show({
      date: new Date(),
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        console.log('Got date: ', date)

        this.hora = `${Utils.paddy(date.getHours())}-${Utils.paddy(date.getMinutes())}`;
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

}
