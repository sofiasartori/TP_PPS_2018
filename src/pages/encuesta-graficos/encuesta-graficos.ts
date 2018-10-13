import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { User } from '../../utils/FactoryUser';
import { StringsL } from '../../providers/Strings';

/**
 * Generated class for the EncuestaGraficosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-encuesta-graficos',
  templateUrl: 'encuesta-graficos.html',
})
export class EncuestaGraficosPage {

  @ViewChild('barCanvasRange') barCanvasRange;
  @ViewChild('doughnutCanvasRadio') doughnutCanvasRadio;
  @ViewChild('doughnutCanvasSelect') doughnutCanvasSelect;
  @ViewChild('doughnutCanvasCheck') doughnutCanvasCheck;

  barChartRange: any;
  doughnutChartRadio: any;
  doughnutChartSelect: any;
  doughnutChartCheck: any;
  barChartRangeArray = [];
  doughnutChartRadioArray = [];
  doughnutChartSelectArray = [];
  doughnutChartCheckArray = [];
  user: User;
  key
  qrLeido: {
    dataQr: string,
    typeQr: string
  }
  ENCUESTA_TEMPLATE = {
    check: {
      f: 0,
      t: 0
    },
    radio: {
      s: 0,
      n: 0
    },
    range: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0
    },
    select: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0
    }
  }

  dataEncuesta = {
    check: {
      f: 0,
      t: 0
    },
    radio: {
      s: 0,
      n: 0
    },
    range: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0
    },
    select: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0
    }
  };
  constructor(private stringsL:StringsL,public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewWillEnter() {

    this.user = this.navParams.get('user');
    this.dataEncuesta = this.ENCUESTA_TEMPLATE;
    this.key = this.navParams.get('qr').key;
    // { user: this.user, qr: { patente: this.patente, key: this.key } }
    this.user.traerEncuestas(this.key).
      ref.on('value', snapshot => {
        snapshot.forEach(data => {
          if (data.val().check) {
            this.dataEncuesta.check.t++
          } else {
            this.dataEncuesta.check.f++
          }
          if (data.val().radio == 'Si') {
            this.dataEncuesta.radio.s++;
          } else {
            this.dataEncuesta.radio.n++;
          }
          this.dataEncuesta.range[data.val().range]++;
          this.dataEncuesta.select[data.val().select]++;
        });
        this.completeData()
        this.initCharts();
        console.log(this.dataEncuesta);
      });



    // console.log(this.user);
  }

  completeData() {
    this.doughnutChartRadioArray = [
      this.dataEncuesta.radio.s,
      this.dataEncuesta.radio.n
    ]
    this.barChartRangeArray = [
      this.dataEncuesta.range[1],
      this.dataEncuesta.range[2],
      this.dataEncuesta.range[3],
      this.dataEncuesta.range[4],
      this.dataEncuesta.range[5]
    ];
    this.doughnutChartSelectArray = [
      this.dataEncuesta.select[1],
      this.dataEncuesta.select[2],
      this.dataEncuesta.select[3],
      this.dataEncuesta.select[4],
      this.dataEncuesta.select[5]
    ];
    this.doughnutChartCheckArray = [this.dataEncuesta.check.t, this.dataEncuesta.check.f];
    console.log(this.doughnutChartCheckArray)
  }
  ionViewDidLoad() {


  }

  initCharts() {
    this.barChartRange = new Chart(this.barCanvasRange.nativeElement, {

      type: 'bar',
      data: {
        labels: ["0", "1", "2", "3", "4", "5"],
        datasets: [{
          label: 'Cantidad',
          // data: [12, 19, 3, 5, 2, 3],
          data: this.barChartRangeArray,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }

    });

    this.doughnutChartRadio = new Chart(this.doughnutCanvasRadio.nativeElement, {

      type: 'doughnut',
      data: {
        labels: ["Si", "No"],
        datasets: [{
          label: 'Cantidad',
          // data: [12, 19, 3, 5, 2, 3],
          data: this.doughnutChartRadioArray,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
      }

    });

    this.doughnutChartSelect = new Chart(this.doughnutCanvasSelect.nativeElement, {

      type: 'doughnut',
      data: {
        labels: ["0", "1", "2", "3", "4", "5"],
        datasets: [{
          label: 'Cantidad',
          // data: [12, 19, 3, 5, 2, 3],
          data: this.doughnutChartSelectArray,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
      }

    });


    this.doughnutChartCheck = new Chart(this.doughnutCanvasCheck.nativeElement, {

      type: 'doughnut',
      data: {
        labels: ["Si", "No"],
        datasets: [{
          label: 'Cantidad',
          // data: [12, 19, 3, 5, 2, 3],
          data: this.doughnutChartCheckArray,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB"
          ]
        }]
      }

    });
  }

}
