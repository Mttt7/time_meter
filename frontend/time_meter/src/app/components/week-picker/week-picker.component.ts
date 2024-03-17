import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrentDateService } from '../../services/current-date.service';

@Component({
  selector: 'app-week-picker',
  templateUrl: './week-picker.component.html',
  styleUrl: './week-picker.component.scss'
})
export class WeekPickerComponent {

  currentDate: Date = new Date();
  constructor(private currentDS: CurrentDateService) { }

  ngOnInit(): void {
    this.currentDS.currentDate.subscribe((date) => {
      this.currentDate = date;
    });
  }


  nextWeek() {
    this.currentDS.nextMonday();

  }
  previousWeek() {
    this.currentDS.previousMonday();
  }

}
