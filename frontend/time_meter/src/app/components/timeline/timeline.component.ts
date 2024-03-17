import { Component, ViewChild } from '@angular/core';
import _, { get } from 'lodash';
import { forkJoin } from 'rxjs';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill
} from "ng-apexcharts";
import { GoogleCalendarService } from '../../services/google-calendar.service';
import { Calendar } from '../../models/calendar';
import { CurrentDateService } from '../../services/current-date.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {


  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  calendars: Calendar[] = []
  scope = 'week'
  currentDate: Date = new Date();

  series: any = []
  categories: any = []

  loading = true;



  constructor(private googleCalendarService: GoogleCalendarService,
    private currentDS: CurrentDateService) {
    this.chartOptions = this.getPristineChartsOptions();
  }

  ngOnInit() {
    this.getActiveCalendars();
    this.currentDS.currentDate.subscribe((date) => {
      this.currentDate = date;
      this.populateChart();
    });
  }

  getPristineChartsOptions(): Partial<ChartOptions> {
    return {
      series: [],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            total: {
              enabled: true,
              style: {
                color: 'rgb(146, 135, 135)',
                fontSize: '13px',
                fontWeight: 900
              }
            }
          }
        }
      },
      xaxis: {
        type: "category",
        categories: []
      },
      legend: {
        position: "right",
        offsetY: 40
      },
      fill: {
        opacity: 1
      }

    };
  }

  getActiveCalendars() {
    this.googleCalendarService.getActiveCalendars().subscribe(calendars => {
      this.calendars = calendars;
      this.populateChart();

    })
  }





  populateChart() {
    let categories = this.getCategories(this.currentDate.toISOString(), this.scope);

    if (this.chartOptions) {
      this.chartOptions.xaxis!.categories = categories;
    }
    this.series = [];

    this.loading = true;

    const observables = this.calendars.map(calendar => this.googleCalendarService.getTime(calendar.id, this.scope, this.currentDate.toISOString()));

    forkJoin(observables).subscribe(results => {
      results.forEach((res, index) => {
        let data: number[] = [];
        let groupedByDate = _.groupBy(res.time, el => el.date.slice(0, 10));
        groupedByDate = this.addMissingDates(groupedByDate, categories);

        // Sortujemy klucze groupedByDate zgodnie z porządkiem kategorii
        const sortedKeys = categories.map(date => date.slice(0, 10));

        sortedKeys.forEach(date => {
          const timeSum = groupedByDate[date].reduce((acc, cur) => acc + cur.time, 0);
          data.push(timeSum);
        });

        this.series.push({
          name: this.calendars[index].summary,
          data: data
        });
        this.chartOptions.series = this.series;
      });
      this.loading = false;
    });
  }


  addMissingDates(groupedByDate: _.Dictionary<{ date: string; time: number; }[]>, categories: string[]): _.Dictionary<{ date: string; time: number; }[]> {
    const dates = Object.keys(groupedByDate);
    const missingDates = categories.filter(date => !dates.includes(date));
    missingDates.forEach(date => {
      groupedByDate[date] = [{ date: date, time: 0 }]; // Dodajemy obiekt z brakującą datą i czasem ustawionym na 0
    });
    return groupedByDate; // Zwracamy zmodyfikowany obiekt groupedByDate
  }



  getCategories(startDate: string, scope: string): string[] {
    const categories: string[] = [];
    const startDateObj = new Date(startDate);
    if (scope === 'week') {
      for (let i = 0; i < 7; i++) {
        const date = new Date(startDateObj);
        date.setDate(startDateObj.getDate() + i);
        categories.push(this.formatDate(date));
      }
    } else if (scope === 'day') {
      categories.push(this.formatDate(startDateObj));
    } else if (scope === 'month') {
      for (let i = 0; i < 30; i++) {
        const date = new Date(startDateObj);
        date.setDate(startDateObj.getDate() + i);
        categories.push(this.formatDate(date));
      }
    }
    return categories;
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onDateChanged() {
    throw new Error('Method not implemented.');
  }



}



