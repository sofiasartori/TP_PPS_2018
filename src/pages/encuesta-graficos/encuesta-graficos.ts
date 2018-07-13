import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { User } from '../../utils/FactoryUser';

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
  qrLeido: {
    dataQr: string,
    typeQr: string
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewWillEnter() {
    this.user = this.navParams.get('user');
    console.log(this.user);
  }
  ionViewDidLoad() {
    this.user.traerEncuestas('cliente')
    this.barChartRange = new Chart(this.barCanvasRange.nativeElement, {

      type: 'bar',
      data: {
        labels: ["0", "1", "2", "3", "4", "5"],
        datasets: [{
          label: '# of Votes',
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
        labels: ["0", "1", "2", "3", "4", "5"],
        datasets: [{
          label: '# of Votes',
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
          label: '# of Votes',
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
        labels: ["No", "Si"],
        datasets: [{
          label: '# of Votes',
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
