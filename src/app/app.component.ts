import { Component } from '@angular/core';
import { CovidService } from './services/covid.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Datos del coronavirus en el Mundo';
  chart = [];

  constructor(private _covid:CovidService){}

  ngOnInit(){
    this._covid.dataCovid()
    .subscribe(res => {
      const global = res["Global"]
      const countries = res["Countries"]
      console.log(global)

      this.chart = new Chart('canvasGlobal',{
        type: 'horizontalBar',
        data: {
          labels : ['Total Mundo', 'Nuevos Casos'],
          datasets : [{
              label: 'Confirmados',
              fill: true,
              backgroundColor: ["blue","blue"],
              data : [global.TotalConfirmed, global.NewConfirmed]
          },{
              label: 'Muertos',
              backgroundColor: ["red","red"],
              data: [global.TotalDeaths, global.NewDeaths]
          },
          {
            label: 'Recuperados',
            backgroundColor: ["green","green"],
            data: [global.TotalRecovered, global.NewRecovered ]
          }

        ]
        },
        options: {
                // Elements options apply to all of the options unless overridden in a dataset
                // In this case, we are setting the border of each horizontal bar to be 2px wide
                elements: {
                  rectangle: {
                    borderWidth: 2,
                  }
                },
                responsive: true,
                legend: {
                  position: 'right',
                },
                title: {
                  display: true,
                  text: 'Total Mundo'
                }
              }
        });
    })
  }
}
